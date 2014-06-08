function Minimax() {

    this.feuille = [];
    this.ix = [];
    this.jx = [];

    this.end = [];

}

Minimax.prototype.initWithGame = function(game, moveCount) {

    this.game = new Game();
    this.game.initWithPawns(game.pawns);

    this.playMoveCount = moveCount;

    for (var l=0; l<10; l++) {

        this.ix[l] = 0;
        this.jx[l] = 0;

        this.end[l] = false;

        this.feuille[l] = [];
        for (var i=0; i<5; i++) {
            this.feuille[l][i] = [];
            for (var j=0; j<5; j++) {
                this.feuille[l][i][j] = 0;
            }
        }

    }

};

Minimax.prototype.minimax = function(moveCount, player) {

    var minimum, maximum;

    sortie :
    
    // Boucle sur les lignes
    for (var i=0; i<5; i++) {

        // Retient la valeur de i en fonction de nbcoups
        this.ix[moveCount] = i;

        // Boucle sur les colonnes
        for (var j=0; j<5; j++) {

            if (this.end[moveCount]) {
                this.end[moveCount] = false;
                break sortie;
            }

            // Retient la valeur de j en fonction de nbcoups
            this.jx[moveCount] = j;

            //if (moveCount == 1) NSLog(@"\t\ti : %d, j : %d", ix[1], jx[1]);

            // Si la colonne est disponible...
            if (this.game.h[i][j]<4) {

                // Pose un pion et teste si le coup est gagnant
                if (this.game.putPawnAt(i, j, player)) {
                    // Si oui remplit le tableau feuille
                    this.feuille[moveCount][i][j] = player;
                    // Enlève le pion
                    this.game.removePawnAt(i, j);
                    // Sort de la boucle for
                    break sortie;
                }

                // Met à jour le nombre de pion sur la colonne
                this.game.h[i][j]++;

                // Si ce n'est pas le dernier coup
                if (moveCount<this.playMoveCount) {
                    // Passe au coup suivant
                    this.minimax(moveCount+1, player*(-1));
                    // Enlève le pion
                    this.game.h[i][j]--;
                    this.game.removePawnAt(i, j);
                }
                // ...Si oui enlève le pion
                else {
                    this.game.h[i][j]--;
                    this.game.removePawnAt(i, j);
                }

            }
            // Sinon remplit le tableau feuille
            else {
                this.feuille[moveCount][i][j] = player*(-1);
            }
        }
    }

    // Remplit la partie
    switch (player)	{
        case 1 :
            // Prend le max si c'est à lui de jouer
            maximum = Utils.maxTab(feuille[moveCount]);
            // Remplit le tableau feuille du niveau inférieur
            this.feuille[moveCount-1][this.ix[moveCount-1]][this.jx[moveCount-1]] = maximum;
            // Si ce coup est gagnant, inutile de chercher plus loin
            if ((moveCount%2 == 1) && (maximum == -1)) {
                this.end[moveCount-1] = true;
            }
            break;
        case -1 :
            // Prend le min si c'est le coup du joueur
            minimum = Utils.minTab(feuille[moveCount]);
            // Remplit le tableau feuille du niveau inférieur
            this.feuille[moveCount-1][this.ix[moveCount-1]][this.jx[moveCount-1]] = minimum;
            // Si le coup du joueur est gagnant, inutile de chercher plus loin
            if ((moveCount%2 == 0) && (minimum == 1)) {
                this.end[moveCount-1] = true;
            }
            break;
    }

    // Initialise le tableau feuille
    if (moveCount > 1) {
        for (var i=0 ;i<5 ;i++) {
            for (var j=0; j<5; j++)	{
                this.feuille[moveCount][i][j] = 0;
            }
        }
    }

};

Minimax.prototype.logFeuille = function() {

    for (var l=0; l<this.playMoveCount; l++) {
        console.log("feuille[%i]", l);
        for (var j=0 ;j<5 ;j++) {
            console.log("%i %i %i %i %i", this.feuille[l][0][j], this.feuille[l][1][j], this.feuille[l][2][j], this.feuille[l][3][j], this.feuille[l][4][j]);
        }
    }
    console.log("\n");

};