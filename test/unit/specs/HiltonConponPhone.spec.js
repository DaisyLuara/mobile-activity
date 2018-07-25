import { mount, createLocalVue } from '@vue/test-utils'
import Phone from '@/pages/hiltonc/phone.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('Phone.vue', () => {
  it('test if root div is exist', () => {
    const wrapper = mount(Phone, {
      localVue,
      router
    })
    expect(wrapper.contains('div')).to.equal(true)
  })

  it('mock click button and get phone error', () => {
    const wrapper = mount(Phone, {
      localVue,
      router
    })
    const button = wrapper.find({ ref: 'button' })
    expect(button.is('img')).to.equal(true)
    button.trigger('click')
    expect(wrapper.vm.phoneError).to.equal(true)
  })
})
