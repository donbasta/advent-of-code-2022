import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

class Day8 {
    public static void main(String args[]) {

        List<List<Integer>> board = new ArrayList<>();

        BufferedReader reader;
        try {
            reader = new BufferedReader(new FileReader("input"));
            String line = reader.readLine();

            while (line != null) {
                List<Integer> tmp = new ArrayList<>();
                for (int i = 0; i < line.length(); i++) {
                    tmp.add(Character.getNumericValue(line.charAt(i)));
                }
                board.add(tmp);
                line = reader.readLine();
            }
        } catch (Exception e) {
        }

        int height = board.size();
        int width = board.get(0).size();

        // Part 1
        // int visible = 0;
        // for (int i = 0; i < height; i++) {
        // for (int j = 0; j < width; j++) {
        // int cur = board.get(i).get(j);
        // boolean ans = false;
        // boolean tmp = true;
        // for (int k = i - 1; k >= 0; k--) {
        // if (board.get(k).get(j) >= cur) {
        // tmp = false;
        // break;
        // }
        // }
        // ans = (ans | tmp);

        // tmp = true;
        // for (int k = i + 1; k < height; k++) {
        // if (board.get(k).get(j) >= cur) {
        // tmp = false;
        // break;
        // }
        // }
        // ans = (ans | tmp);

        // tmp = true;
        // for (int k = j - 1; k >= 0; k--) {
        // if (board.get(i).get(k) >= cur) {
        // tmp = false;
        // break;
        // }
        // }
        // ans = (ans | tmp);

        // tmp = true;
        // for (int k = j + 1; k < width; k++) {
        // if (board.get(i).get(k) >= cur) {
        // tmp = false;
        // break;
        // }
        // }
        // ans = (ans | tmp);

        // if (ans) {
        // visible++;
        // }
        // }
        // }

        // System.out.println(visible);

        // Part 2
        int mx = 0;
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                int cur = board.get(i).get(j);

                int atas = 0;
                for (int k = i - 1; k >= 0; k--) {
                    atas++;
                    if (board.get(k).get(j) >= cur) {
                        break;
                    }
                }

                int bawah = 0;
                for (int k = i + 1; k < height; k++) {
                    bawah++;
                    if (board.get(k).get(j) >= cur) {
                        break;
                    }
                }

                int kiri = 0;
                for (int k = j - 1; k >= 0; k--) {
                    kiri++;
                    if (board.get(i).get(k) >= cur) {
                        break;
                    }
                }

                int kanan = 0;
                for (int k = j + 1; k < width; k++) {
                    kanan++;
                    if (board.get(i).get(k) >= cur) {
                        break;
                    }
                }

                mx = Math.max(mx, atas * bawah * kiri * kanan);
            }
        }

        System.out.println(mx);
    }
}
