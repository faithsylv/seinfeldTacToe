$( document ).ready( function () {

  //create players and set up a current player tracker

    const player1 = {
      symbol: '',
      html: '',
      score: NaN, undefined
    }

    const player2 = {
      symbol: '',
      html: '',
      score: NaN, undefined
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
      const cell1Text = $(' #1 ').text();
      const cell2Text = $(' #2 ').text();
      const cell3Text = $(' #3 ').text();
      const cell4Text = $(' #4 ').text();
      const cell5Text = $(' #5 ').text();
      const cell6Text = $(' #6 ').text();
      const cell7Text = $(' #7' ).text();
      const cell8Text = $(' #8 ').text();
      const cell9Text = $(' #9 ').text();

      //if else statements to compare all potential 3-in-a-row combos for a winner
      if (cell1Text === cell2Text && cell1Text === cell3Text && cell1Text !== ''){
        ifWinnerCalls();

      } else if (cell4Text === cell5Text && cell4Text === cell6Text && cell4Text !== ''){
        ifWinnerCalls();

      } else if (cell7Text === cell8Text && cell7Text === cell9Text && cell7Text !== '') {

        ifWinnerCalls();

      } else if (cell1Text === cell4Text && cell1Text === cell7Text && cell1Text !== '') {

        ifWinnerCalls();

      } else if (cell2Text === cell5Text && cell2Text === cell8Text && cell2Text !== '') {

        ifWinnerCalls();

      } else if (cell3Text === cell6Text && cell3Text === cell9Text && cell3Text !== '') {

        ifWinnerCalls();

      } else if (cell1Text === cell5Text && cell1Text == cell9Text && cell1Text !== '') {

        ifWinnerCalls();

      } else if (cell3Text === cell5Text && cell3Text === cell7Text && cell3Text !== ''){

        ifWinnerCalls();

      }

      //Code to alternatively check for a draw / case of no winner

      let boardHasRemainingSpaces = false; // variable to detect if the board still has empty cells

      //loop through each cell - at each looop, boardHasRemainingSpaces is turned to true.Because variable starts as false, if it loops through and there are no empty spaces, boardHasRemainingSpaces will stay false once the loop finishes (NB the checkWinner function runs at every cell click)
      for ( let i = 1; i <= 9; i ++ ) {
        if ( $( `#${ i }` ).text() === '') {
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
          // checkWinner();

          switchPlayer();

        }
      });

    }

    }

  playGame();

});
