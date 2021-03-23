import client from './client'

export default {
  getTask (projectId, callback) {
    return client.pget(`/api/plugins/actions/projects/${projectId}/create-invoice`)
  }
  // addPreview (data) {
  //   const taskId = data.taskId
  //   const projectId = data.projectId
  //   return client.ppost(
  //     `/api/plugins/actions/projects/${projectId}/create-invoice`,
  //     {}
  //   )
  // }
}
