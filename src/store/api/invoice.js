import client from './client'

export default {
  getInvoices (callback) {
    client.get('/api/plugins/data/invoices/all', callback)
  },

  createInvoice (params) {
    return client.ppost(
      `/api/plugins/actions/projects/${params.projectId}/create-invoice`,
      params.data
    )
  },

  updateInvoice (params) {
    return client.put(
      `/api/plugins/data/invoices/${params.invoiceId}`,
      params.data
    )
  }

}
