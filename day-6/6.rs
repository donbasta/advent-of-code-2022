use std::cmp::max;
use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let file = File::open("input").unwrap();
    let reader = BufReader::new(file);

    let mut cnt: Vec<i32> = vec![0; 26];

    for line in reader.lines() {
        let line = line.unwrap();
        let line_chars: Vec<char> = line.chars().collect();

        // Part 1
        // let gram = 4;
        // Part 2
        let gram = 14;

        for i in 0..(gram - 1) {
            let cur_dig = (line_chars[i] as usize) - ('a' as usize);
            cnt[cur_dig] += 1;
        }

        for i in (gram - 1)..line.len() {
            let cur_dig = (line_chars[i] as usize) - ('a' as usize);
            cnt[cur_dig] += 1;
            let mut mx = 0;
            for j in 0..26 {
                mx = max(mx, cnt[j]);
            }
            if mx <= 1 {
                println!("{}", i + 1);
                return;
            }
            let del_dig = (line_chars[i - (gram - 1)] as usize) - ('a' as usize);
            cnt[del_dig] -= 1;
        }

        println!("no {}-substring whose digits are different", gram);
    }
}
