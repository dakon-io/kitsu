import invoiceleApi from '../api/invoice'
import { sortInvoice } from '../../lib/sorting'

import {
  LOAD_INVOICE_START,
  LOAD_INVOICE_ERROR,
  LOAD_INVOICE_END

} from '../mutation-types'

const initialState = {
  invoice: [],
  displayedInvoice: [],
  invoiceMap: {},
  isInvoiceLoading: false,
  isInvoiceLoadingError: true
}

const state = {
  ...initialState
}

const getters = {
  invoice: state => state.invoice,
  displayedInvoice: state => state.displayedInvoice,
  invoiceMap: state => state.invoiceMap,
  isInvoiceLoading: state => state.isInvoiceLoading,
  isInvoiceLoadingError: state => state.isInvoiceLoadingError,
  getInvoice: (state, getters) => (id) => state.invoiceMap[id]
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
  }
}

const mutations = {
  [LOAD_INVOICE_START] (state) {
    state.isInvoiceLoading = true
    state.isInvoiceLoadingError = false
    state.invoiceMap = {}
  },

  [LOAD_INVOICE_ERROR] (state) {
    state.isInvoiceLoading = false
    state.isInvoiceLoadingError = true
  },

  [LOAD_INVOICE_END] (state, invoice) {
    state.isInvoiceLoading = false
    state.isInvoiceLoadingError = false
    state.invoice = sortInvoice(invoice)
    state.displayedInvoice = state.invoice
    state.invoice.forEach((invoice) => {
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
