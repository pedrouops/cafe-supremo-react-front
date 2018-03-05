
import structure from '../data/structure.json'
import registry from '../components/scs'


const createComponent = registry 

// console.log('PAGES', structure.base.pages.filter(e => !e.isDetailPage && !e.isSearchPage ))

const pages = [12, 34,  39, 41,  43,  44]
    .reduce((a,id) => Object.assign(a, {[id]: require('../data/pages/' + id + '.json')}),{})
 
const types = Object.values(pages)
    .map(page => Object.values(page.base.componentInstances)
    .map(e => ({type:e.type,id:e.id})))
    .reduce((a,e) => a.concat(e),[])
    
// console.log(types.sort((a,b)=> a.type.localeCompare(b.type)).map(e => e.type).filter((e,i,a) => a.indexOf(e)===i))


const get = (slug) =>{
    // TODO implement the routing lookup                                                                                                          
    const pageData = structure.base.pages.filter(p => p.parentId === null).reduce((a,e,i) => i===0? e:a,0)
    const page = pages[''+ pageData.id]
    console.log('page', page)
    const components = id => page.base.componentInstances[id]
    const factory =  id => createComponent(components(id))
    return {slots: id => page.base.slots[id], components: components, createComponent: factory }
}
export default get