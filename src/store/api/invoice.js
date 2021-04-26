import client from './client'

export default {
  getInvoices (callback) {
    client.get('/api/plugins/data/invoices/all', callback)
  }
}
