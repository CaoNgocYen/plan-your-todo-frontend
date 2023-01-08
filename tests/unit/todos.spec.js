import { mount } from '@vue/test-utils'
import ToDoTable from '@/components/ToDoTable.vue'
import About from '@/views/About.vue'

describe('Testing About.vue', () => {
  it('should show page title', () => {
    const wrapper = mount(About)

    expect(wrapper.text()).toMatch('ToDos')
  })

  it('should have toDo table component', () => {
    const wrapper = mount(About)

    const table = wrapper.findComponent(ToDoTable)
    expect(table.exists()).toBeTruthy()
  })
})
