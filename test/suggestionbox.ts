import {fixture,except,html} from '@open-wc/testing';
import { MyElement } from '../src/MyElement';

describe('my-element', ()=>{
    it('is defined', async ()=>{
        const ele =await fixture(html ` <my-element></my-element> `);
        except(ele).to.be.an.instanceof(MyElement);

        const ele1=document.createElement("my-element");
        except(ele1).to.be.an.instanceof(MyElement);
    });
    it('check attributes',async()=>{
        const ele =await fixture(html `<my-element minchar=1></my-element>`);
        except(ele.minchar).to.equal(1);
        
        except(ele["minchar"].to.equal(1))

        ele.setAttribute(1)
        except(ele.minchar).to.equal(1);
    })
}

)