let app = new Vue({
  el        : '#app',
  data      : {
    cards: []
  },
  components: {
    'tinymce': VueEasyTinyMCE
  },
  methods   : {
    getFakeData: async function () {
      let data = {};
      let response = await fetch('https://jsonplaceholder.typicode.com/posts/' + Math.floor(Math.random() * (100)));

      if (response.ok) {
        data.texts = await response.json();
      } else {
        data.texts = {};
      }

      response = await fetch('https://jsonplaceholder.typicode.com/photos/' + Math.floor(Math.random() * (100)));

      if (response.ok) {
        data.photo = await response.json();
      } else {
        data.photo = {};
      }

      return data;
    },
    coursive   : function () {
      this.message = this.message.split('').reverse().join('')
    },
    addCard    : function () {
      this.assignCard();
    },
    assignCard : async function () {
      let cardData = await this.getFakeData();

      this.card =
        '   <div class="card-title">' + cardData.texts.title + '</div>\n' +
        '   <img class="card-img" src="' + cardData.photo.url + '">\n' +
        '   <tinymce class="card-body" :toolbar="false" :menubar="false" :height="150">' + cardData.texts.body + '</tinymce>';

      this.cards.push(this.card);
    }
  },
  mounted() {
    for (let i = 0; i < 3; i++) {
      this.assignCard();
    }
  }
});