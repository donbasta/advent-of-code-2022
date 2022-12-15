package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type Coordinate struct {
	x, y int
}

var vec = map[string]Coordinate{
	"L": {-1, 0},
	"U": {0, 1},
	"R": {1, 0},
	"D": {0, -1},
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func max(x int, y int) int {
	if x > y {
		return x
	}
	return y
}

func findNext(frontNew Coordinate, backOld Coordinate) Coordinate {
	if max(abs(frontNew.x-backOld.x), abs(frontNew.y-backOld.y)) <= 1 {
		return backOld
	}
	if abs(frontNew.x-backOld.x) == 2 && abs(frontNew.y-backOld.y) == 2 {
		return Coordinate{(frontNew.x + backOld.x) / 2, (frontNew.y + backOld.y) / 2}
	}

	var pos [4]Coordinate
	pos[0] = Coordinate{frontNew.x + vec["L"].x, frontNew.y + vec["L"].y}
	pos[1] = Coordinate{frontNew.x + vec["U"].x, frontNew.y + vec["U"].y}
	pos[2] = Coordinate{frontNew.x + vec["R"].x, frontNew.y + vec["R"].y}
	pos[3] = Coordinate{frontNew.x + vec["D"].x, frontNew.y + vec["D"].y}

	var newCoord Coordinate

	for j := 0; j < 4; j++ {
		if abs(backOld.x-pos[j].x) <= 1 && abs(backOld.y-pos[j].y) <= 1 {
			newCoord = pos[j]
		}
	}

	return newCoord
}

func main() {
	f, err := os.Open("input")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	scanner := bufio.NewScanner(f)

	vis := make(map[Coordinate]bool)

	// Part 1
	// len := 2
	// Part 2
	length := 10

	var curs = make([]Coordinate, length)
	for i := range curs {
		curs[i] = Coordinate{0, 0}
	}

	vis[curs[length-1]] = true

	for scanner.Scan() {
		moves := strings.Split(scanner.Text(), " ")
		dir := moves[0]
		cntSteps, _ := strconv.Atoi(moves[1])
		for i := 0; i < cntSteps; i++ {
			curs[0].x += vec[dir].x
			curs[0].y += vec[dir].y

			for j := 1; j < length; j++ {
				curs[j] = findNext(curs[j-1], curs[j])
			}

			// fmt.Println(curs)
			vis[curs[length-1]] = true
		}
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	// fmt.Println(vis)
	fmt.Println(len(vis))
}
