import invoiceleApi from '../api/invoice'
import { sortInvoice } from '../../lib/sorting'

import {
  LOAD_INVOICE_START,
  LOAD_INVOICE_ERROR,
  LOAD_INVOICE_END

} from '../mutation-types'

const initialState = {
  invoices: [],
  displayedInvoice: [],
  invoiceMap: {},
  isInvoiceLoading: false,
  isInvoiceLoadingError: true
}

const state = {
  ...initialState
}

const getters = {
  invoices: state => state.invoices,
  displayedInvoice: state => state.displayedInvoice,
  invoiceMap: state => state.invoiceMap,
  isInvoiceLoading: state => state.isInvoiceLoading,
  isInvoiceLoadingError: state => state.isInvoiceLoadingError,
  getInvoice: (state, getters) => (id) => state.invoiceMap[id],
  getDraftInvoice: (state, getters) => (projectId) => {
    return state.invoices.find(
      (invoice) => invoice.status === 'draft',
      (invoice) => invoice.projectId === projectId
    )
  }
}

const actions = {

  loadInvoice ({ commit, state }, callback) {
    commit(LOAD_INVOICE_START)
    invoiceleApi.getInvoices((err, invoices) => {
      if (err) {
        commit(LOAD_INVOICE_ERROR)
      } else {
        commit(LOAD_INVOICE_END, invoices)
      }
      if (callback) callback(err)
    })
  },

  createInvoice (
    { commit, state },
    { projectId, data }
  ) {
    return invoiceleApi.createInvoice({
      projectId,
      data
    })
  },

  updateInvoice (
    { commit, state },
    { invoiceId, data }
  ) {
    return invoiceleApi.updateInvoice({
      invoiceId,
      data
    })
  }

}

const mutations = {
  [LOAD_INVOICE_START] (state) {
    state.isInvoiceLoading = true
    state.isInvoiceLoadingError = false
    state.invoices = []
    state.invoiceMap = {}
  },

  [LOAD_INVOICE_ERROR] (state) {
    state.isInvoiceLoading = false
    state.isInvoiceLoadingError = true
  },

  [LOAD_INVOICE_END] (state, invoices) {
    state.isInvoiceLoading = false
    state.isInvoiceLoadingError = false
    state.invoices = sortInvoice(invoices)
    state.displayedInvoice = state.invoices
    state.invoices.forEach((invoice) => {
      state.invoiceMap[invoice.id] = invoice
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
