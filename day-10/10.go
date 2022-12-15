package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func idxToCoord(v int) (int, int) {
	b := v % 40
	a := (v - b) / 40
	return a, b
}

func main() {
	f, err := os.Open("input")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	scanner := bufio.NewScanner(f)

	var crt [6][40]string
	for i := 0; i < 6; i++ {
		for j := 0; j < 40; j++ {
			crt[i][j] = "."
		}
	}

	clock := 0
	register := 1
	total := 0
	for scanner.Scan() {
		tokens := strings.Split(scanner.Text(), " ")
		_, jReg := idxToCoord(register)

		if tokens[0] == "noop" {
			iCur, jCur := idxToCoord(clock)
			if (jCur >= jReg-1) && (jCur <= jReg+1) {
				crt[iCur][jCur] = "#"
			}
			clock += 1
			if (clock%40 == 20) && (clock <= 220) {
				total += clock * register
			}
		} else if tokens[0] == "addx" {
			signal, _ := strconv.Atoi(tokens[1])

			for i := 0; i < 2; i++ {
				iCur, jCur := idxToCoord(clock)
				if (jCur >= jReg-1) && (jCur <= jReg+1) {
					crt[iCur][jCur] = "#"
				}
				clock += 1
				if (clock%40 == 20) && (clock <= 220) {
					total += clock * register
				}
			}

			register += signal
		}
	}

	// Part 1
	// fmt.Println(total)

	// Part 2
	for i := 0; i < 6; i++ {
		fmt.Println(crt[i])
	}
}
