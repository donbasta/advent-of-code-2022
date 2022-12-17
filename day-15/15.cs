using System;
using System.Collections.Generic;

namespace Day15
{
    class Day15
    {
        static void Main(string[] args)
        {
            // const int Y = 2000000;
            // Dictionary<int, bool> cant = new Dictionary<int, bool>();
            // Dictionary<int, bool> lol = new Dictionary<int, bool>();
            const int MX = 4000000;
            List<Tuple<int, int>>[] intervals = new List<Tuple<int, int>>[MX + 1];
            for (int i = 0; i <= MX; i++)
            {
                intervals[i] = new List<Tuple<int, int>>();
            }

            foreach (string line in System.IO.File.ReadLines(@"input"))
            {
                string[] tokens = line.Split(' ');
                string sx = tokens[2];
                sx = sx.Substring(2, sx.Length - 3);
                int ssx = Int32.Parse(sx);
                string sy = tokens[3];
                sy = sy.Substring(2, sy.Length - 3);
                int ssy = Int32.Parse(sy);
                string bx = tokens[8];
                bx = bx.Substring(2, bx.Length - 3);
                int bbx = Int32.Parse(bx);
                string by = tokens[9];
                by = by.Substring(2, by.Length - 2);
                int bby = Int32.Parse(by);

                // if (bby == Y)
                // {
                //     lol[bbx] = true;
                // }
                // if (ssy == Y)
                // {
                //     lol[ssx] = true;
                // }

                int manhattanDistance = Math.Abs(ssx - bbx) + Math.Abs(ssy - bby);
                // Part 1
                // int A = Math.Abs(i - ssy);
                // for (int i = A - manhattanDistance + ssx; i <= manhattanDistance - A + ssx; i++)
                // {
                //     cant[i] = true;
                // }
                for (int i = 0; i <= MX; i++)
                {
                    int A = Math.Abs(i - ssy);
                    if (A > manhattanDistance) continue;
                    intervals[i].Add(new Tuple<int, int>(A - manhattanDistance + ssx, manhattanDistance - A + ssx));
                }
            }
            // Part 1
            // int ans = cant.Count;
            // foreach (KeyValuePair<int, bool> entry in cant)
            // {
            //     if (lol.ContainsKey(entry.Key))
            //     {
            //         --ans;
            //         hah++;
            //     }
            // }
            // System.Console.WriteLine(ans);

            // Part 2
            Tuple<int, int> ans = new Tuple<int, int>(-1, -1);
            for (int i = MX; i >= 0; i--)
            {
                // merging the intervals
                if (intervals[i].Count == 0)
                {
                    continue;
                }
                List<Tuple<int, int>> mergedIntervals = new List<Tuple<int, int>>();
                intervals[i].Sort(Comparer<Tuple<int, int>>.Default);
                int l = intervals[i][0].Item1;
                int r = intervals[i][0].Item2;
                for (int j = 1; j < intervals[i].Count; j++)
                {
                    (var nowl, var nowr) = intervals[i][j];
                    if (nowl > r + 1)
                    {
                        mergedIntervals.Add(new Tuple<int, int>(l, r));
                        l = nowl;
                        r = nowr;
                    }
                    else
                    {
                        r = Math.Max(r, nowr);
                    }
                }
                mergedIntervals.Add(new Tuple<int, int>(l, r));
                for (int j = 0; j < mergedIntervals.Count; j++)
                {
                    if (mergedIntervals[j].Item2 < 0) continue;
                    if (mergedIntervals[j].Item2 + 1 > MX)
                    {
                        if (mergedIntervals[j].Item1 - 1 >= 0 && mergedIntervals[j].Item1 - 1 <= MX)
                        {
                            new Tuple<int, int>(i, mergedIntervals[j].Item1 - 1);
                        }
                        break;
                    }
                    ans = new Tuple<int, int>(i, mergedIntervals[j].Item2 + 1);
                    break;
                }
            }
            long freq = (long)ans.Item2 * 4000000 + ans.Item1;
            System.Console.WriteLine(freq);
        }
    }
}
