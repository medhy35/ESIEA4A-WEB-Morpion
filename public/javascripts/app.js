/* globals Vue */

Vue.prototype.$http = axios;


var App = new Vue({
    el: '#app',
    data: {
      score : 1,
      gameEnd : false,
        currentPage: 'players',
        myList: [],
        name: this.currentplayer,
        player1: '',
        player2: '',
        rows: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
               ],
         next: 'x',

         finished: false,
         stalemate: false,

        searchQuery: '',
        gridColumns: ['name', 'score'],
        gridData: [
            { name: 'Chuck Norris', power: Infinity },
            { name: 'Bruce Lee', power: 9000 },
            { name: 'Jackie Chan', power: 7000 },
            { name: 'Jet Li', power: 8000 }
        ]

    },
    created() {
      this.$http.get('/list').then(list => {
        console.log('Affichage du tableau de score', list);
          this.myList = list.data;
      })
          .catch(err => {
              console.log('error',err);
          })
    },

    methods: {

        sendScore() {
            this.$http.post('/list',{
                name1: this.currentplayer,
                score: this.score,

            }) .then(() => {
                this.myList.push({
                    name: this.name1,
                    score: this.score
                })
            })
        },
        adminpanel() {
          this.$http.post('/admin', {
              user: this.username,
              pass: this.password,
          }) .then(()=> {

          })
        },

        goToMorpion: function(){
            this.currentplayer=this.player1;
            this.currentPage="morpion"
        },
        goToPlayer: function(){

            this.currentPage="players"
        },
        goTologin: function(){

            this.currentPage="login"
        },
        adminpanel : function() {

            this.currentPage = "admin"
        },
        tap: function(value, rowIndex, colIndex) {
            if (!this.finished && !value) {
                //let rows = this.rows;
                this.rows[rowIndex][colIndex] = this.next;
                //this.rows = rows.slice(0);

                if (this.checkWinner()) {
                    this.finished = true;
                    if(this.currentplayer === this.player1){

                    }
                    else if (this.currentplayer === this.player2) {

                    }

                } else if (this.checkStalemate()) {
                    this.stalemate = true;
                    this.finished = true;
                } else {
                    this.nextPlayer();
                }
            }
        },
        restart: function(e){
            this.sendScore();
            this.rows = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            this.finished = false;
            this.stalemate = false;
            this.nextPlayer();
        },

        nextPlayer: function() {
            this.next = (this.next === 'x' ? 'o' : 'x');
            this.currentplayer = (this.currentplayer === this.player1 ? this.player2 : this.player1)
            console.log(this.currentplayer)
        },
        checkStalemate: function() {
            return !this.finished &&
                (this.checkValuesPresent(this.rows[0]) &&
                    this.checkValuesPresent(this.rows[1]) &&
                    this.checkValuesPresent(this.rows[2]));
        },
        checkWinner: function() {
            return (
                this.checkValues(this.rows[0]) ||
                this.checkValues(this.rows[1]) ||
                this.checkValues(this.rows[2]) ||
                this.checkValues([this.rows[0][0], this.rows[1][0], this.rows[2][0]]) ||
                this.checkValues([this.rows[0][1], this.rows[1][1], this.rows[2][1]]) ||
                this.checkValues([this.rows[0][2], this.rows[1][2], this.rows[2][2]]) ||
                this.checkValues([this.rows[0][0], this.rows[1][1], this.rows[2][2]]) ||
                this.checkValues([this.rows[0][2], this.rows[1][1], this.rows[2][0]]));
        },
        checkValues: function(values) {
            return this.checkValuesPresent(values) && this.checkValuesMatch(values);
        },
        checkValuesPresent: function(values) {
            return (values[0] != '' && values[1] != '' && values[2] != '');
        },
        checkValuesMatch: function(values) {
            return (values[0] === values[1]) && (values[1] === values[2]);
        }
    }

});


