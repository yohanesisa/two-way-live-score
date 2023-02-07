import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  scores: {}
})

export const mutations = {
  ...vuexfireMutations
//   SET_COUNT_DOCUMENT: (state, countDocument) => {
//     // Only needed for SSR/Universal Mode
//     state.countDocument = countDocument
}

export const actions = {
  bindSessionsDocument: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('sessions')
      .doc('fP4pHVBVCqfC2o8uorce')
    await bindFirestoreRef('scores', ref, { wait: true })
  }),
  unbindSessionsDocument: ({ commit }, { documentId } = {}) => {
    firestoreAction(function ({ unbindFirestoreRef }) {
      unbindFirestoreRef(documentId, false)
    })
  },
}
export const getters = {
  scores(state) {
    return state.scores
  },
}