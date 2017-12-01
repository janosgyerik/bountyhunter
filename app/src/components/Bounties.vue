<template>
  <div class="questions">
    <p><input v-model="tagsInput" v-on:change="applyFilters" size="80"></p>
    <h1>Questions <button v-on:click="update">Update</button> {{ quotaRemaining }}/{{ quotaMax }}</h1>
    <div v-for="q in questions" class="question" v-bind:class="q.potentialClass">
      <h2><a :href="q.url">{{ q.title }}</a></h2>
      <p><span v-for="tag in q.tags" class="tag">{{ tag }}</span></p>
      <p>
        days: {{ q.days }}
        views: {{ q.views }}
        answers: {{ q.answers }}
        score: {{ q.score }}
        op: {{ q.owner.rep }}
        value: {{ q.bounty.value }}
      </p>
    </div>
  </div>
</template>

<script>
// other possibly interesting fields:
// - last_activity_date
// - last_edit_date
const mapper = (q) => {
  const date = new Date(1000 * q.creation_date)
  const days = Math.floor((new Date() - date) / 3600 / 24 / 1000)
  const accepted = q.accepted_answer_id !== undefined
  const answers = q.answer_count

  var potentialClass = ''
  if (accepted) {
    potentialClass = 'potential-none'
  } else if (answers === 0) {
    potentialClass = 'potential-high'
  } else if (answers > 1) {
    potentialClass = 'potential-low'
  }

  return {
    title: q.title,
    url: q.link,
    tags: q.tags,
    score: q.score,
    date: date,
    days: days,
    views: q.view_count,
    accepted: accepted,
    answers: answers,
    bounty: {
      value: q.bounty_amount,
      date: new Date(1000 * q.bounty_closes_date)
    },
    owner: {
      url: q.owner.link,
      name: q.owner.display_name,
      rep: q.owner.reputation
    },
    potentialClass: potentialClass
  }
}

const merge = (that, response) => {
  that.quotaMax = response.quota_max
  that.quotaRemaining = response.quota_remaining
  response.items.map(mapper).forEach(q => { that.repo[q.url] = q })
}

const applyFilters = (that) => {
  const tags = new Set(that.tagsInput.split(/\s+/))

  that.questions = Object.values(that.repo)
    .filter(q => q.tags.some(tag => tags.has(tag)))
    .sort((q1, q2) => q2.bounty.date - q1.bounty.date)
}

export default {
  name: 'Bounties',
  data () {
    return {
      repo: {},
      questions: [],
      tagsInput: 'java bash sonarqube awk git shell javascript maven sonarlint r unix go python junit',
      quotaMax: 0,
      quotaRemaining: 0
    }
  },
  mounted () {
    this.fetch('http://localhost:8080/static/sample1.json').then(r => {
      this.merge(r)
      this.applyFilters()
    })
  },
  methods: {
    fetch (url) {
      return fetch(url).then(r => r.json())
    },
    update () {
      this.fetch('https://api.stackexchange.com/2.2/questions/featured?pagesize=100&site=stackoverflow').then(r => {
        this.merge(r)
        this.applyFilters()
      })
    },
    merge (response) {
      merge(this, response)
    },
    applyFilters () {
      applyFilters(this)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.tag {
  padding: 0 .5em;
  margin: 5px;
  color: #39739d;
  background-color: #E1ECF4;
}

.question {
  border: 1px dashed silver;
  margin: .5em;
}

.potential-high {
  background-color: #fee;
}

.potential-low, .potential-low a {
  background-color: #eee;
  color: #ccc;
}

.potential-none {
  display: none;
}
</style>
