window.dom = {
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    after(node, node2) {
        //insertBefore(newItem ,existingItem)
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    before(node, node2) {
        //insertBefore(newItem ,existingItem)
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    wrap(node, parent) {
        //将新节点插入已有节点之前
        dom.before(node, parent)
        //将已有节点作为新节点的子节点
        dom.append(parent, node)
    },
    remove(node) {
        node.parentNode.removeChild(node)
        //node.remove()较新，IE不支持
        return node
    },
    empty(node) {
        // 等于 const childNodes = node.childNodes
        const { childNodes } = node
        const array = []
        let x = node.firstChild
        // 因为node.firstChild是动态的，原有的firstChild被移除后，第二个孩子节点变为firstChild
        while (x) {
            array.push(dom.remove(x))
            x = node.firstChild
        }
        return array
    },
    attr(node, name, value) {//重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) { //适配
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string // IE
            } else {
                node.textContext = string
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText // IE
            } else {
                return node.textContext
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(node, 'color', 'blue')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                //dom.style(node, 'color')
                return node.style[name]
            } else if (name instanceof Object) {
                //dom.style(node, {color: 'red'}
                const object = name
                for (let key in object) {
                    //key : border / color
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: {
        //使用节点的classList属性
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            //使用node.classList.contains()来判断是否含有对应属性
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        //若scope不为空，则使用scope，否则使用document
        //返回的是list
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        //node.children返回的是伪数组，使用Array.from将其转换为Array
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        //node.nextSibling返回的数据包含文本节点
        while (x && x.nodeType === 3) {
            //nextSibling的数据为动态
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        //node.nextSibling返回的数据包含文本节点
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        //遍历节点
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
}