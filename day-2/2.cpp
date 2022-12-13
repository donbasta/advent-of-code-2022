#include<bits/stdc++.h>
using namespace std;

int main() {
    ifstream fin ("input");

    int score[] = {1, 2, 3};

    char opp, me;
    int total_score = 0;

    //Part 1
    // while (fin >> opp >> me) {
    //     int round_score = 0;
    //     round_score += score[me - 'X'];
    //     if (me == 'X') {
    //         if (opp == 'A') round_score += 3;
    //         else if (opp == 'B') round_score += 0;
    //         else round_score += 6;
    //     } else if (me == 'Y') {
    //         if (opp == 'A') round_score += 6;
    //         else if (opp == 'B') round_score += 3;
    //         else round_score += 0;
    //     } else if (me == 'Z') {
    //         if (opp == 'A') round_score += 0;
    //         else if (opp == 'B') round_score += 6;
    //         else round_score += 3;
    //     } else {
    //         assert(false);
    //     }
    //     total_score += round_score;
    // }

    //Part 2
    while (fin >> opp >> me) {
        int round_score = 0;
        if (me == 'X') {
            if (opp == 'A') round_score += 3 + 0;
            else if (opp == 'B') round_score += 1 + 0;
            else round_score += 2 + 0;
        } else if (me == 'Y') {
            if (opp == 'A') round_score += 1 + 3;
            else if (opp == 'B') round_score += 2 + 3;
            else round_score += 3 + 3;
        } else if (me == 'Z') {
            if (opp == 'A') round_score += 2 + 6;
            else if (opp == 'B') round_score += 3 + 6;
            else round_score += 1 + 6;
        } else {
            assert(false);
        }
        total_score += round_score;
    }

    cout << total_score;
}
