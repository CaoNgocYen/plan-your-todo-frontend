import { mount } from '@vue/test-utils'
import ToDos from '@/views/ToDos.vue'
import ToDoTable from '@/components/ToDoTable.vue'

describe('Testing ToDos.vue', () => {
  it('should show page title', () => {
    // when
    const wrapper = mount(ToDos)

    // then
    expect(wrapper.text()).toMatch('ToDos')
  })

  it('should have toDo table component', () => {
    // when
    const wrapper = mount(ToDos)

    // then
    const table = wrapper.findComponent(ToDoTable)
    expect(table.exists()).toBeTruthy()
  })
})
