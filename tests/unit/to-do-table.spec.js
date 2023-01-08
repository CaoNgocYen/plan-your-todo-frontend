import { shallowMount } from '@vue/test-utils'
import ToDoTable from '@/components/ToDoTable.vue'
describe('ToDoTable', () => {
  let wrapper

  const toDos = [
    { id: 1, title: 'To-do 1', description: 'Description 1', deadline: '2022-01-01', completed: false },
    { id: 2, title: 'To-do 2', description: 'Description 2', deadline: '2022-01-03', completed: true },
    { id: 3, title: 'To-do 3', description: 'Description 3', deadline: '2022-01-02', completed: false }
  ]

  const deleteTodo = jest.fn()
  const editTodo = jest.fn()
  const openModal = jest.fn()

  beforeEach(() => {
    wrapper = shallowMount(ToDoTable, {
      propsData: {
        toDos,
        deleteTodo,
        editTodo,
        openModal
      }
    })
  })

  it('renders the to-do items in a table', () => {
    const rows = wrapper.findAll('tbody > tr')
    expect(rows.length).toBe(3)
    expect(rows.at(0).text()).toContain('To-do 1')
    expect(rows.at(1).text()).toContain('To-do 2')
    expect(rows.at(2).text()).toContain('To-do 3')
  })

  it('toggles the completed property of a to-do item and calls the editTodo function when the done button is clicked', () => {
    const doneButton = wrapper.find('tbody > tr:first-of-type > td:last-of-type > i:first-of-type')
    doneButton.trigger('click')
    expect(toDos[0].completed).toBe(true)
    expect(editTodo).toHaveBeenCalledWith(toDos[0])
    doneButton.trigger('click')
    expect(toDos[0].completed).toBe(false)
    expect(editTodo).toHaveBeenCalledWith(toDos[0])
  })
})
