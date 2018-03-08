class Linklist
    attr_accessor :val, :next
    def initialize(val)
        @val = val
        @next = nil
    end
end

def func(str)
    str=str.split('')
    p str
    result=Linklist.new('')
    head = result
    while str.length >=3
        if str[0] != str[1]
            result.next = Linklist.new(str.shift)
            result = result.next
        else
            if str[1] != str[2]
                2.times {
                    result.next = Linklist.new(str.shift)
                    result = result.next
                }
            else
                3.times {str.shift}
            end

        end
    end
    str.each do |i|
        p i
        result.next = Linklist.new(i)
        result = result.next
    end
    return head.next
end

a=""
p func(a)
