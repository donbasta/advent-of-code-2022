#include<bits/stdc++.h>
using namespace std;

int main() {
    ifstream fin ("input");

    string x;
    vector<int> calories;
    int tmp = 0;
    while (getline(fin, x)) {
        if (x == "") {
            calories.push_back(tmp);
            tmp = 0;
        } else {
            tmp += stoi(x);
        }
    }
    calories.push_back(tmp);

    // Part 1

    // int mx = -1;
    // for (auto cal : calories) {
    //     mx = max(mx, cal);
    // }

    // cout << mx << '\n';

    // Part 2
    
    int tot = 0;
    sort(calories.begin(), calories.end(), greater<>());
    tot = calories[0] + calories[1] + calories[2];

    cout << tot << '\n';
}
