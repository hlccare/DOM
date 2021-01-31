const div = dom.create('<div>123</div>')
dom.attr(div, 'title', 'title')
title = dom.attr(div, 'title')
console.log(`title: ${title}`)
console.log(div)
dom.text(div, '你好，这是新的内容')
dom.style(test, {border: '1px solid red', color: 'blue'})
console.log(dom.style(test, 'border'))
dom.style(test, 'border','1px solid green')
console.log(dom.style(test, 'border'))

dom.after(test, div)
const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test, div3)
dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'red')
console.log(dom.class.has(test, 'blue'))

const fn = ()=>{
    console.log('点击了')
} 
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const testDiv = dom.find('#test')[0]
console.log(testDiv)

const test2Div = dom.find('#test2')[0]
console.log(dom.find('p', test2Div)[0])


console.log(dom.empty(window.empty))

console.log(dom.parent(test))

console.log(dom.siblings(s2))
console.log(`next: ${dom.next(s2)}`)
console.log(dom.next(s2))
console.log(dom.previous(s2))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n)=> dom.style(n, 'color', 'red'))
console.log(dom.index(t2))
