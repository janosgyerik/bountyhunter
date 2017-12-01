
<template>
  <div class="questions">
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
const q0 = {
  title: 'test',
  bounty: {},
  owner: {},
  bountyOwner: {}
}

const q1 = {
  title: 'Print macro values without knowing the amount of macros',
  url: 'https://stackoverflow.com/questions/47452953/print-macro-values-without-knowing-the-amount-of-macros',
  score: 15,
  date: new Date(2017, 10, 23, 10, 15, 0, 0),
  stars: 3,
  views: 385,
  accepted: true,
  answers: [
    {
      score: 32,
      date: new Date(2017, 10, 23, 11, 0, 0, 0),
      accepted: true,
      owner: {
        url: 'https://stackoverflow.com/users/3233393/quentin',
        name: 'Quentin',
        rep: 34599
      }
    },
    {
      score: 1,
      date: new Date(2017, 10, 30, 0, 47, 0, 0),
      accepted: false,
      owner: {
        url: 'https://stackoverflow.com/users/4641116/eljay',
        name: 'Eljay',
        rep: 557
      }
    }
  ],
  bounty: {
    value: 500,
    text: 'One or more of the answers is exemplary and worthy of an additional bounty.',
    customText: 'Quentin turned the most vexing parse into a boon. This is one of the most beautiful pieces of C++ code I\'ve seen. I can only upvote once, so a bounty it will be',
    endDate: new Date(2017, 11, 2, 21, 24, 0, 0)
  },
  owner: {
    url: 'https://stackoverflow.com/users/1624277/e271p314',
    name: 'e271p314',
    rep: 1300
  },
  bountyOwner: {
    url: 'https://stackoverflow.com/users/817643/storyteller',
    name: 'StoryTeller',
    rep: 51879
  }
}

const q2 = {
  title: 'Keyboard shortcut to insert text (soft hyphen) with CKEditor',
  url: 'https://stackoverflow.com/questions/34491100/keyboard-shortcut-to-insert-text-soft-hyphen-with-ckeditor',
  score: 12,
  date: new Date(2015, 11, 28, 9, 44, 0, 0),
  stars: 3,
  views: 444,
  accepted: false,
  answers: [
    {
      score: 10,
      date: new Date(2017, 10, 25, 2, 45, 0, 0),
      accepted: false,
      owner: {
        url: 'https://stackoverflow.com/users/5209322/cy-rossignol',
        name: 'Cy Rossignol',
        rep: 5793
      }
    }
  ],
  bounty: {
    value: 400,
    text: 'Looking for an answer drawing from credible and/or official sources.',
    customText: 'I commented on this in 2015 and now it turns out I need this, too. Any hints much appreciated.',
    endDate: new Date(2017, 11, 1, 10, 51, 0, 0)
  },
  owner: {
    url: 'https://stackoverflow.com/users/2444764/frank-spade',
    name: 'Frank Spade',
    rep: 74
  },
  bountyOwner: {
    url: 'https://stackoverflow.com/users/187606/pekka-%EC%9B%83',
    name: 'Pekka 웃',
    rep: 331730
  }
}

// http://localhost:8080/static/sample1.json
import sample1 from '../../static/sample1.json'

const questions = () => {
  return sample1.items.map(q => Object.assign({}, q0, {
    // q.tags!!!
    title: q.title,
    url: q.link,
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
  }))
}

const refresh = (that) => {
  // https://api.stackexchange.com/2.2/questions/featured?order=desc&sort=activity&site=stackoverflow
  that.questions.unshift(q1)
}

export default {
  name: 'Bounties',
  data () {
    q2.title = sample1.items.length
    return {
      questions: questions()
    }
  },
  methods: {
    refresh () {
      refresh(this)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
