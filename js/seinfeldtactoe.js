$( document ).ready( function () {

  //create players and set up a current player tracker

    const player1 = {
      symbol: '',
      html: '',
      score: 0
    }

    const player2 = {
      symbol: '',
      html: '',
      score: 0
    }

    const currentPlayer = {
      symbol: '',
      html: '',
    }

    //variable to tell functions whether or not the game is still in play
    let gameOver = false;

    //function to assign initial symbols to players based on button clicks. Called at start of first game.
    const assignSymbol = function () {

      //assign symbol for logic as well as image token for player 1 based on which button they click
      if( $(this).hasClass('jerry-button')  ) {
        player1.symbol = 'x';
        player1.html = '<img src="images/Jerry.png" alt="Image of Jerry Seinfeld" class="jerry-image"/>'
      } else if ( $(this).hasClass('newman-button')  ) {
        player1.symbol= 'y';
        player1.html = '<img src="images/Newman.png" alt="Image of Newman" class="newman-image"/>'
      }

      //assign symbol for logic as well as image token for player 2 based on player 1 choice
      if (player1.symbol === 'x') {
        player2.symbol = 'y';
        player2.html = '<img src="images/Newman.png" alt="Image of Newman" class="newman-image"/>'
      } else if (player1.symbol === 'y'){
        player2.symbol = 'x';
        player2.html = '<img src="images/Jerry.png" alt="Image of Jerry Seinfeld" class="jerry-image"/>'
      }

      //start tracking current player - player 1 always starts
      currentPlayer.symbol = player1.symbol;

      //put each pleayer's token in the token display board to the left of the main board
      $('#player1-symbol-display').html(player1.html);
      $('#player2-symbol-display').html(player2.html);

      //remove the pick your symbol section, including button
      $('#symbol-picker').addClass('invisible');

      //make the cursor symbol appear and set it to the Player 1's symbol as they are starting the game.
      $('#cursor-symbol').removeClass('invisible');
      $('#cursor-symbol').html(player1.html);

      // set event listener to make the cursor symbol follow the cursor around the page
      $(document).on('mousemove', function(e){
        $('#cursor-symbol').css({
          left:  e.pageX,
          top:   e.pageY
        });
      });
    }

    //switch between players after each click. Called in main playGame function every time a cell is clicked
    const switchPlayer = function () {


      if(currentPlayer.symbol === player1.symbol) { //change the current player symbol
        currentPlayer.symbol = player2.symbol;
        $('#cursor-symbol').html(player2.html); // change the symbol that follows the cursor to the new symbol
      } else if (currentPlayer.symbol === player2.symbol){
        currentPlayer.symbol = player1.symbol;
        $('#cursor-symbol').html(player1.html);
      }

    }

    const checkWinner = function () {

      //get the contents of each cell from the DOM for comparison

      const cell1 = $('.square--1').html();
      const cell2 = $('.square--2').html();
      const cell3 = $('.square--3').html();
      const cell4 = $('.square--4').html();
      const cell5 = $('.square--5').html();
      const cell6 = $('.square--6').html();
      const cell7 = $('.square--7').html();
      const cell8 = $('.square--8').html();
      const cell9 = $('.square--9').html();

      console.log(cell1 === cell2 && cell1 === cell3 && cell1 !== '');

      // if else statements to compare all potential 3-in-a-row combos for a winner
      if (cell1 === cell2 && cell1 === cell3 && cell1 !== ''){
        ifWinnerCalls();

      } else if (cell4 === cell5 && cell4 === cell6 && cell4 !== ''){
        ifWinnerCalls();

      } else if (cell7 === cell8 && cell7 === cell9 && cell7 !== '') {

        ifWinnerCalls();

      } else if (cell1 === cell4 && cell1 === cell7 && cell1 !== '') {

        ifWinnerCalls();

      } else if (cell2 === cell5 && cell2 === cell8 && cell2 !== '') {

        ifWinnerCalls();

      } else if (cell3 === cell6 && cell3 === cell9 && cell3 !== '') {

        ifWinnerCalls();

      } else if (cell1 === cell5 && cell1 == cell9 && cell1 !== '') {

        ifWinnerCalls();

      } else if (cell3 === cell5 && cell3 === cell7 && cell3 !== ''){

        ifWinnerCalls();

      }

      //Code to alternatively check for a draw / case of no winner

      let boardHasRemainingSpaces = false; // variable to detect if the board still has empty cells

      //loop through each cell - at each looop, boardHasRemainingSpaces is turned to true.Because variable starts as false, if it loops through and there are no empty spaces, boardHasRemainingSpaces will stay false once the loop finishes (NB the checkWinner function runs at every cell click)
      for ( let i = 1; i <= 9; i ++ ) {
        if ( $( `.square--${ i }` ).is(':empty')) {
          boardHasRemainingSpaces = true;
        }
      }

      //if the boardHasRemainingSpaces variable is still false, and the game isn't already over, iniitialise the relevant functions to end the game and clear the board. Checking for gameOve here prevents cats game from resulting if the board is full but there is a winner in the final cell because the above code changes gameOver to true and this doesn't execute
      if (boardHasRemainingSpaces === false && gameOver === false) {

        gameOver = true;
        $(' #cats-game' ).removeClass( 'invisible' );
        $( '#cats-game' ).addClass(' cats-game-over' );
        $( '#play-again' ).removeClass( 'invisible' );
        gameOver = true;
        $( '.play-again' ).on( 'click' , clearBoard );
        $( '#cursor-symbol' ).addClass( 'invisible' );
      }

    }

    const ifWinnerCalls = function () {

      console.log('winner!');

      // set gameOver variable to true to  stop ongoing play / clicking on the board once there is a winner
      gameOver = true;

      //remove the cursor symbol from view (until board is cleared)
      $( '#cursor-symbol' ).addClass( 'invisible' );

      //show the winner banner - wait some time to see result before showing
      setTimeout( function () {$( '#winner-banner' ).addClass( 'banner-over' )} , 850);

      //show the play again button - wait some time to see result before showing
      setTimeout( function () {$( '#play-again' ).removeClass( 'invisible' )} , 850);

      //see if the player's symbol matches the text in the currentPlayerSymbol variable at the time of winning - if they match, then that player won
      if(player1.symbol === currentPlayer.symbol) {
        console.log(currentPlayer.symbol);
        $( '.name-winner' ).text( 'Player 1' ) //add text to the name winner span displayed on banner
        $( '#player1-score' ).text( player1.score += 1 ); // display player's new score
      } else if (player2.symbol === currentPlayer.symbol ) {
        $( '.name-winner' ).text( 'Player 2' );
        $( '#player2-score' ).text( player2.score += 1 );
      }


      //once the play again button is clicked, clear the board
      $( '.play-again' ).on( 'click', clearBoard );

    }


    const clearBoard = function () {

      console.log('clearing!');

      // Loop to remove the text in each table cell
      for( let i = 1; i <= 9; i ++ ) {
        $( `.square--${ i }` ).empty();
      }

      //re-set the gameOver variable to false so that game play can start (NB on click event for each table cell in main playGame function can only run if gameOver is false)
      gameOver = false;

      //if it was a win event, remove the winner banner from view
      $( '#winner-banner' ).removeClass( 'banner-over' ).addClass( 'invisible' );
      // $( '#winner-banner' ).addClass( 'invisible' );

      //if it was a draw, remove the cats game banner from view
      $( '#cats-game' ).removeClass( 'cats-game-over' ).addClass( 'invisible' );
      // $( '#cats-game' ).addClass( 'invisible' );

      //remove the play again button from view because clicking it is what calls this clearBoard function so we don't need it until the game ends again (set in the ifWinnerCalls function)
      $( '#play-again' ).addClass( 'invisible' );

      //show the cursor symbol again so you can see who starts the next game
      $( '#cursor-symbol' ).removeClass( 'invisible' );

    }


    const playGame = function () {

      $( '.jerry-button' ).on( 'click', assignSymbol );
      $( '.newman-button' ).on( 'click', assignSymbol );

      for( let i = 1; i <= 9; i ++ ) {

      //anonymous fn run on each click of a cell - only runs if the cell is empty and gameOver is false
      $( `.square--${ i }` ).on( 'click' , function () {

        if( $( this ).is(':empty') && !gameOver ) {

          // change text in chosen / clicked cell to whatever is in currentPlayerSymbol global variable
          if (currentPlayer.symbol === player1.symbol) {
            $( this ).html( player1.html );
          } else if (currentPlayer.symbol === player2.symbol){
            $( this ).html( player2.html );
          }

          //check if there is a winner as a result of that click
          checkWinner();

          switchPlayer();

        }
      });

    }

    }

  playGame();

});
