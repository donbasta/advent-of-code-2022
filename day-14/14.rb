def main()

    occupied = Hash.new
    most_bottom_for_col = Hash.new

    File.readlines('input').each do |line|
        corners = line.split("->")
        corners.map! {|c| c.strip}
        corners.map! {|c| c.split(",")}
        corners.each {|c| c.map!{|d| d.to_i}}

        for i in 1..(corners.length - 1)
            if corners[i][0] == corners[i - 1][0]
                x = corners[i][0]
                mn = [corners[i][1], corners[i - 1][1]].min
                mx = [corners[i][1], corners[i - 1][1]].max
                for j in mn..mx
                    occupied[[x, j]] = true
                end
                most_bottom_for_col[x] = mx
            elsif corners[i][1] == corners[i - 1][1]
                y = corners[i][1]
                mn = [corners[i][0], corners[i - 1][0]].min
                mx = [corners[i][0], corners[i - 1][0]].max
                for j in mn..mx
                    occupied[[j, y]] = true
                    if not most_bottom_for_col.key?(j)
                        most_bottom_for_col[j] = y
                    else
                        most_bottom_for_col[j] = [most_bottom_for_col[j], y].max
                    end
                end

            end
        end
    end

    floor = -1
    most_bottom_for_col.each do |k, v|
        floor = [floor, v].max
    end
    floor = floor + 2

    # print occupied
    # print "\n"
    # print most_bottom_for_col
    # print "\n"

    count = 0

    while true do
        curx = 500
        cury = 0

        # Part 2, checking if the source is already occupied or not
        if occupied.key?([curx, cury])
            break
        end
        count += 1

        # Part 1, flag for meeting abyss
        # abyss = false
        while true do
            # meet the abyss for the part 1
            # if not most_bottom_for_col.key?(curx)
            #     abyss = true
            #     break
            # end

            # for part 2, check if cury already maxxed or not
            if cury == floor - 1
                occupied[[curx, cury]] = true
                break
            end

            nx = curx
            ny = cury + 1
            if not occupied.key?([nx, ny])
                curx = nx
                cury = ny
            elsif not occupied.key?([nx - 1, ny])
                curx = nx - 1
                cury = ny
            elsif not occupied.key?([nx + 1, ny])
                curx = nx + 1
                cury = ny
            else # the sand stops here
                occupied[[curx, cury]] = true
                break
            end
        end

        # Part 1
        # if abyss
        #     count -= 1
        #     break
        # end
    end

    puts count
end

main()
