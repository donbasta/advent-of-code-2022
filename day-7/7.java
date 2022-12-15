import java.io.BufferedReader;
import java.io.FileReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

class FolderTree {
    public String name;
    public int size;
    public Map<String, FolderTree> children;
    public FolderTree parent;
    public int totalDirSize;

    public FolderTree(String name, int size) {
        this.name = name;
        this.size = size;
        this.children = new HashMap<>();
        this.parent = null;
        this.totalDirSize = 0;
    }

    public void addChildren(FolderTree f) {
        if (this.children.get(f.name) != null) {
            return;
        }
        this.children.put(f.name, f);
        f.parent = this;
    }

    public int traverse() {
        int ret = 0;
        for (Entry<String, FolderTree> child : this.children.entrySet()) {
            FolderTree f = child.getValue();
            if (f.size > 0) {
                this.totalDirSize += f.size;
            } else {
                ret += f.traverse();
                this.totalDirSize += f.totalDirSize;
            }
        }
        if (this.totalDirSize <= 100000) {
            ret += this.totalDirSize;
        }
        return ret;
    }

    public int traverseFindEnoughSpace(int need) {
        int ret = Integer.MAX_VALUE;
        if (this.totalDirSize >= need) {
            ret = this.totalDirSize;
        }
        for (Entry<String, FolderTree> child : this.children.entrySet()) {
            FolderTree f = child.getValue();
            if (f.size > 0)
                continue;
            ret = Math.min(ret, f.traverseFindEnoughSpace(need));
        }
        return ret;
    }
}

class Day7 {
    public static void main(String[] args) {

        FolderTree root = new FolderTree("/", 0);
        FolderTree curDir = root;

        BufferedReader reader;
        try {
            reader = new BufferedReader(new FileReader("input"));
            String line = reader.readLine();

            while (line != null) {
                String[] tokens = line.split(" ");
                if (tokens[0].equals("$")) {
                    String cmd = tokens[1];
                    if (cmd.equals("cd")) {
                        String dest = tokens[2];
                        if (dest.equals("..")) {
                            if (curDir.parent != null) {
                                curDir = curDir.parent;
                            }
                        } else if (dest.equals("/")) {
                            curDir = root;
                        } else {
                            curDir = curDir.children.get(dest);
                        }
                        line = reader.readLine();
                    } else if (cmd.equals("ls")) {
                        line = reader.readLine();
                        while (!line.split(" ")[0].equals("$")) {
                            String[] tmpTokens = line.split(" ");
                            String objName = tmpTokens[1];
                            FolderTree newObj;
                            if (tmpTokens[0].equals("dir")) {
                                newObj = new FolderTree(objName, 0);
                            } else {
                                int size = Integer.parseInt(tmpTokens[0]);
                                newObj = new FolderTree(objName, size);
                            }
                            curDir.addChildren(newObj);

                            line = reader.readLine();
                            if (line == null) {
                                break;
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
        }

        // Part 1
        System.out.println(root.traverse());

        // Part 2
        int totalMemory = 70000000;
        int totalFilledMemory = root.totalDirSize;
        int totalEmptyMemory = totalMemory - totalFilledMemory;
        int need = 30000000 - totalEmptyMemory;
        System.out.println(root.traverseFindEnoughSpace(need));
    }
}
