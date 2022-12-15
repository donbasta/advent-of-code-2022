use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let file = File::open("input").unwrap();
    let reader = BufReader::new(file);

    let mut scanning_crates = true;

    let mut stacks: Vec<Vec<char>> = vec![vec![]; 9];

    for line in reader.lines() {
        let line = line.unwrap();
        if line.len() == 0 {
            scanning_crates = false;
            for i in 0..9 {
                let mut tmp: Vec<char> = vec![];
                let size = stacks[i].len();
                for j in (0..size).rev() {
                    tmp.push(stacks[i][j]);
                }
                stacks[i] = tmp;
            }
            continue;
        }
        if scanning_crates {
            let line_chars: Vec<char> = line.chars().collect();
            for i in 0..9 {
                let check = line_chars[4 * i + 1];
                if check != ' ' {
                    stacks[i].push(check);
                }
            }
        } else {
            let tmp: Vec<&str> = line[..].split(" ").collect();
            assert_eq!(tmp[0], "move");
            assert_eq!(tmp[2], "from");
            assert_eq!(tmp[4], "to");
            assert_eq!(tmp.len(), 6);
            let amount: i32 = tmp[1].parse().unwrap();
            let mut from: usize = tmp[3].parse().unwrap();
            let mut to: usize = tmp[5].parse().unwrap();
            from -= 1;
            to -= 1;

            // Part 1
            // for _ in 0..amount {
            //     let last = stacks[from][stacks[from].len() - 1];
            //     stacks[from].pop();
            //     stacks[to].push(last);
            // }

            // Part 2
            for i in 0..amount {
                let take = stacks[from][stacks[from].len() - (amount as usize) + (i as usize)];
                stacks[to].push(take);
            }
            for _ in 0..amount {
                stacks[from].pop();
            }
        }
    }

    for i in 0..9 {
        print!("{}", stacks[i][stacks[i].len() - 1]);
    }
}
