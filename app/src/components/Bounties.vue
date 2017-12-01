
<template>
  <div class="questions">
    <p><input v-model="tagsInput"></p>
    <h1>Questions <button v-on:click="refresh">Refresh</button></h1>
    <div v-for="q in questions" class="question">
      <h2><a :href="q.url">{{ q.title }}</a></h2>
      <p>score: {{ q.score }} views: {{ q.views }} accepted: {{ q.accepted }}
          value: {{ q.bounty.value }} op: {{ q.owner.rep }} b: {{ q.bountyOwner.rep }}
          answers: <span v-for='a in q.answers'>({{ a.score }} by {{ a.owner.rep }})</span></p>
      <p>date: {{ q.date }} bounty date: {{ q.bounty.endDate }}</p>
    </div>
  </div>
</template>

<script>
// http://localhost:8080/static/sample1.json
// https://api.stackexchange.com/2.2/questions/featured?order=desc&sort=activity&site=stackoverflow
import sample1 from '../../static/sample1.json'
import sample2 from '../../static/sample2.json'

const q0 = {
  title: 'test',
  tags: [],
  bounty: {},
  owner: {},
  bountyOwner: {}
}

const mapper = (q) => Object.assign({}, q0, {
  title: q.title,
  url: q.link,
  tags: q.tags,
  score: q.score,
  date: new Date(1000 * q.creation_date),
  // last_activity_date, last_edit_date
  stars: -1,
  views: q.view_count,
  accepted: q.accepted_answer_id !== undefined,
  answers: Array.from({ length: q.answer_count }).map(() => {
    return {
      score: -99,
      date: new Date(),
      accepted: false,
      owner: {}
    }
  }),
  bounty: {
    value: q.bounty_amount,
    text: '?',
    customText: '?',
    endDate: new Date(1000 * q.bounty_closes_date)
  },
  owner: {
    url: q.owner.link,
    name: q.owner.display_name,
    rep: q.owner.reputation
  },
  bountyOwner: {}
})

const merge = (that, response) => {
  response.items.map(mapper).forEach(q => { that.repo[q.url] = q })

  const tags = new Set(that.tagsInput.split(/\s+/))

  // set that.questions to updated filtered
  that.questions = Object.values(that.repo)
    .filter(q => q.tags.some(tag => tags.has(tag)))
    .sort((q1, q2) => q2.bounty.endDate - q1.bounty.endDate)

  // evict old data
  // TODO
}

export default {
  name: 'Bounties',
  data () {
    return {
      repo: {},
      questions: [],
      tagsInput: 'java bash sonarqube'
    }
  },
  mounted () {
    this.merge(sample1)
  },
  methods: {
    refresh () {
      this.merge(sample2)
    },
    merge (response) {
      merge(this, response)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
