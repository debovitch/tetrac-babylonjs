function Computer(game) {

    this.game = game;

    this.minimax = null;

}

Computer.prototype.play = function() {
    
    var toggle = 0, minimum = 0, nbcoups = 0;   // toggle compte le nombre de colonnes perdantes

    this.game.finOrdi = false; this.game.maximum = 0;

    // Regarde si la position est connue de la base de données
    if (this.game.counter < 9) {
        if (this.firstMoves()) {
            this.game.finOrdi = true;
            return;
        }
    }

    // Détermine la profondeur de calcul
    this.depth();

    // Tant qu'il ne sait pas où jouer et que toutes les colonnes ne sont pas perdantes
    while (!this.game.maximum && toggle != 24 && nbcoups < this.game.totalcoups) {

        // Augmente la profondeur de calcul
        nbcoups++;
        // Calcule le minimax
        this.minimax = new Minimax(this.game, nbcoups);
        this.minimax.minimax(1, 1);
        this.game.maximum = Helper.maxTab(this.minimax.feuille[1]);
        for (var i=0; i<5; i++) {
            for (var j=0; j<5; j++) {
                if (this.minimax.feuille[1][i][j] == -1) {
                    toggle++;
                }
            }
        }

    }

    switch (this.game.maximum) {

        case 1 :			// joue là où il gagne le plus rapidement possible
            nbcoups = 1;    // fixe nbcoups à 1
            do {            // boucle

                this.minimax  = new Minimax(this.game, nbcoups);
                this.minimax.minimax(1, 1); // calcule le minimax
                this.game.maximum = Helper.maxTab(this.minimax.feuille[1]);
                nbcoups++;  // et incrémente totalcoups

            } while (this.game.maximum != 1);   // tant qu'il ne sait pas qu'il est gagnant
            this.x = Helper.argmaxX(this.minimax.feuille[1]);
            this.y = Helper.argmaxY(this.minimax.feuille[1]);
            break;

        case 0 :			// joue la colonne la plus riche en lignes potentielles centre exclu
            this.x = Helper.argmaxX(this.minimax.feuille[1]);
            this.y = Helper.argmaxY(this.minimax.feuille[1]);
            break;

        case -1 :			// repousse au maximum l'échéance de sa perte
            nbcoups = 0;	// en jouant le coup qui, s'il était joué par l'adversaire,
            do {			// le ferait gagner le plus rapidement possible

                nbcoups++;  // incrémente totalcoups
                this.minimax = new Minimax(this.game, nbcoups);
                this.minimax.minimax(1, -1);    // et calcule le minimax
                minimum = Helper.minTab(this.minimax.feuille[1]);

            } while (minimum != -1);    // tant que l'adversaire ne sait pas qu'il est gagnant

            this.x = Helper.argminX(minimax.feuille[1]);
            this.y = Helper.argminY(minimax.feuille[1]);
            break;

        default :
            break;

    }

    this.game.finOrdi = true;   // l'ordi a fini

};

Computer.prototype.firstMoves = function() {

    switch (this.game.counter) {
        case 1 :
            if (this.game.pawns[2][2][0] == 0) {
                this.x = 2;
                this.y = 2;
            }
            else {
                this.x = 3;
                this.y = 1;
            }
            break;
        default : break;
    }

    return false;

};

Computer.prototype.depth = function() {     //	Détermine la profondeur de calcul
								            //	suivant l'avancement du jeu
    if (this.game.counter < 20) {
        this.game.totalcoups = 5;
    } else if (this.game.counter < 80) {
        this.game.totalcoups = 6;
    } else {
        this.game.totalcoups = 100 - this.game.counter;
    }

};