import { mount } from '@vue/test-utils'
import CreateToDo from '@/components/CreateToDo.vue'

const wrapper = mount(CreateToDo, {
  propsData: {
    modalData: {
      id: 1
    }
  }
})

describe('CreateToDo', () => {
  it('should save the form data', async () => {
    await wrapper.setData({
      title: 'Buy milk',
      description: 'Remember to buy 2% milk',
      deadline: '2022-02-15',
      completed: true
    })
    wrapper.vm.saveForm()
  })
})
