total = 0


def get_prio(c):
    if ord(c) >= ord('a') and ord(c) <= ord('z'):
        return ord(c) - ord('a') + 1
    return ord(c) - ord('A') + 1 + 26


# Part 1
# with open("input") as inp:
#     rucksacks = inp.readlines()
#     for r in rucksacks:
#         r = r.rstrip()
#         length = len(r)
#         left_r = r[:length//2]
#         right_r = r[length//2:]
#         for c in left_r:
#             if c in right_r:
#                 total += get_prio(c)
#                 break

# Part 2
with open("input") as inp:
    rucksacks = inp.readlines()
    rucksacks = list(map(lambda x: x.rstrip(), rucksacks))
    for i in range(0, len(rucksacks), 3):
        el = rucksacks[i: i + 3]
        ada = [[False for _ in range(52)] for _ in range(3)]
        for j in range(3):
            for c in el[j]:
                ada[j][get_prio(c) - 1] = True

        for j in range(52):
            if (ada[0][j] and ada[1][j] and ada[2][j]):
                total += (j + 1)
                break

print(total)
