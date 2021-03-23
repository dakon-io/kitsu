// import async from 'async'
// import client from '../api/client'

// import invoicesApi from '../api/invoice'
// import peopleApi from '../api/people'
// import {
//   arrayMove
// } from '../../lib/models'

// import personStore from './people'

// import {
//   ADD_INVOICE
// } from '../mutation-types'

const initialState = {
  invoices: [
    {
      id: 'INVDKN123',
      created_at: '2021-03-19T02:23:36',
      status: 'waiting',
      projectName: 'Prj-1',
      tasks: [
        {
          id: 'task1',
          name: 'Task 1',
          price: 153000
        }
      ]
    },
    {
      id: 'INVDKN124',
      created_at: '2021-02-23T02:23:36',
      status: 'approved',
      projectName: 'Prj-2',
      tasks: [
        {
          id: 'task1',
          name: 'Task 1',
          price: 153000
        },
        {
          id: 'task2',
          name: 'Task 2',
          price: 153000
        },
        {
          id: 'task3',
          name: 'Task 3',
          price: 153000
        }
      ]
    },
    {
      id: 'INVDKN123',
      created_at: '2021-02-23T02:23:36',
      status: 'rejected',
      projectName: 'Prj-1',
      tasks: [
        {
          id: 'task1',
          name: 'Task 1',
          price: 153000
        },
        {
          id: 'task1',
          name: 'Task 1',
          price: 153000
        },
        {
          id: 'task1',
          name: 'Task 1',
          price: 153000
        }
      ]
    },
    {
      id: 'INVDKN123',
      created_at: '2021-02-23T02:23:36',
      status: 'paid',
      projectName: 'Prj-1',
      tasks: [
        {
          id: 'task1',
          name: 'Task 1',
          price: 153000
        },
        {
          id: 'task1',
          name: 'Task 1',
          price: 153000
        },
        {
          id: 'task1',
          name: 'Task 1',
          price: 153000
        }
      ]
    }
  ]
}

const state = {
  ...initialState
}

// const helpers = {
//   getPerson (personId) {
//     return personStore.getters.getPerson(
//       personStore.state, personStore.getters
//     )(personId)
//   }
// }

const getters = {
  allInvoices: (state) => state.invoices
}

const actions = {
  // addInvoice (
  //   { commit, state },
  //   price
  // ) {
  //   return new Promise((resolve, reject) => {
  //     const data = {
  //       entity_id: ''
  //     }
  //     invoicesApi.addInvoice(data, (err, tasks) => {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         commit(ADD_INVOICE, tasks[0])
  //         resolve()
  //       }
  //     })
  //   })
  // }
  // async fetchInvoices ({ commit }) {
  //   const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
  //   console.log(response)
  // }
  // getInvoices ({ commit, state }) {
  //   return invoicesApi.getTask(taskId)
  //     .then(task => {
  //       commit(LOAD_TASK_END, task)
  //       return Promise.resolve(task)
  //     })
  // }
  // async addInvoice ({ commit }, price) {
  //   const response = client.ppost(
  //     `/api/plugins/actions/projects/${projectId}/create-invoice`,
  //     { price }
  //   )
  //   commit('newInvoice', response.data)
  // }
}

const mutations = {
  // newInvoice: (state, invoice) => state.
  // [ADD_INVOICE] (state, invoice) {
  //   invoice.forEach((task) => {
  //     state.taskMap[task.id] = task
  //   })
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}
