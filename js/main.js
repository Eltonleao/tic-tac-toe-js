const Game = {
    board: ['', '', '', '', '', '', '', '', ''],
    simbols: {
        options: ['X', '0'],
        turn_index: 0,
        changePlayer: function () {
            this.turn_index = (this.turn_index === 1 ? 0 : 1);
        }
    },

    container_element: '',
    gameover: false,
    winner_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    winning_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],


    init: function (container) {
        this.container_element = container;
    },

    make_play: function (position) {
        if (this.gameover) return false;
        if (this.board[position] === '') {
            this.board[position] = this.simbols.options[this.simbols.turn_index];
            this.draw();

            let winner_sequence_index = this.check_winner_sequences(this.simbols.options[this.simbols.turn_index]);


            if (winner_sequence_index >= 0) {
                this.game_is_over();
                Swal.fire({
                    title: 'Game Over',
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            } else {

                let checkVelha = this.checkDeuVelha();
                if(checkVelha >= 0){
                    Swal.fire({
                        title: 'Game Over',
                        text: 'Deu velha!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      });
                      this.game_is_over();
                } else{
                    this.simbols.changePlayer();
                }
            }

            return true;
        } else {
            return false;
        }
    },

    checkDeuVelha : function(){
        if(this.board.includes("")){
            return -1;
        } else{
            return 1;
        }
    },

    game_is_over: function () {
        this.gameover = true;
        console.log("GAME OVER!");

        setTimeout(function(){
            Game.start();
        }, 3000);
    },

    check_winner_sequences: function (simbol) {


        for (i in this.winning_sequences) {


            if (this.board[this.winning_sequences[i][0]] == simbol &&
                this.board[this.winning_sequences[i][1]] == simbol &&
                this.board[this.winning_sequences[i][2]] == simbol) {
                console.log(`Sequencia vencedora: ${i}`)
                return i;
            }
        }

        return -1;

    },

    start: function(){
        this.board.fill('');

        this.draw();
        this.gameover = false;
    },

    draw: function () {
        let content = "";

        for (i in this.board) {
            content += `<div onclick="Game.make_play(${i})">${this.board[i]}</div>`;
        }
        this.container_element.innerHTML = content;
    }
};


Game.init(document.querySelector(".game"));
Game.start();
