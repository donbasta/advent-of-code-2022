def compare(a, b)
    la = a.length
    lb = b.length

    for i in 0..([la, lb].min - 1)
        a_is_array = false
        b_is_array = false
        if a[i].respond_to?(:length)
            a_is_array = true
        end
        if b[i].respond_to?(:length)
            b_is_array = true
        end
        if (not a_is_array) and (not b_is_array)
            if a[i] < b[i]
                return 1
            elsif a[i] > b[i]
                return -1
            end
        elsif a_is_array and (not b_is_array)
            if compare(a[i], [b[i]]) == 1
                return 1
            elsif compare(a[i], [b[i]]) == -1
                return -1
            end
        elsif (not a_is_array) and b_is_array
            if compare([a[i]], b[i]) == 1
                return 1
            elsif compare([a[i]], b[i]) == -1
                return -1
            end
        else
            if compare(a[i], b[i]) == 1
                return 1
            elsif compare(a[i], b[i]) == -1
                return -1
            end
        end
    end

    if la < lb
        return 1
    elsif la > lb
        return -1
    end

    return 0
end

def main()
    lin = 0
    idx = 1
    ans = 0
    ve = [[[2]], [[6]]]
    File.readlines('input').each do |line|
        # Part 1
        # line = line.strip
        # if line.length == 0
        #     if compare(ve[0], ve[1]) == 1
        #         puts idx
        #         ans += idx
        #     end
        #     ve = [nil, nil]
        #     idx += 1
        #     lin += 1
        #     next
        # end
        # if lin % 3 == 0
        #     ve[0] = eval line
        # elsif lin % 3 == 1
        #     ve[1] = eval line
        # end
        # lin += 1

        # Part 2
        line = line.strip
        if line.length == 0
            next
        end
        ve.push(eval line)
    end

    # Part 1
    # if compare(ve[0], ve[1]) == 1
    #     puts idx
    #     ans += idx
    # end
    # puts ans

    # Part 2
    ve = ve.sort { |a, b| -compare(a, b) }
    ans = 1
    for i in 0..(ve.length)
        if ve[i] == [[2]] or ve[i] == [[6]]
            ans = ans * (i + 1)
        end
    end
    puts ans
end

main()
