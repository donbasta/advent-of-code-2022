cnt_pair = 0

# Part 1
# with open("input") as inp:
#     assignments = inp.readlines()
#     assignments = list(map(lambda x: x.rstrip(), assignments))

#     for a in assignments:
#         p, q = a.split(',')
#         p1, p2 = p.split('-')
#         q1, q2 = q.split('-')
#         p1, p2, q1, q2 = int(p1), int(p2), int(q1), int(q2)
#         if (p1 <= q1 and p2 >= q2) or (p1 >= q1 and p2 <= q2):
#             cnt_pair += 1

# Part 2
with open("input") as inp:
    assignments = inp.readlines()
    assignments = list(map(lambda x: x.rstrip(), assignments))

    for a in assignments:
        p, q = a.split(',')
        p1, p2 = p.split('-')
        q1, q2 = q.split('-')
        p1, p2, q1, q2 = int(p1), int(p2), int(q1), int(q2)
        if not ((q1 > p2) or (p1 > q2)):
            cnt_pair += 1

print(cnt_pair)
