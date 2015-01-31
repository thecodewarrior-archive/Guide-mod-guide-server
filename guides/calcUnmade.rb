#!/usr/bin/env ruby

folder  = ARGV[0]
modName = ARGV[1]
lang    = ARGV[2]

unmade = File.open(folder + "/" + 'unmade.txt', 'w+')

if(lang == nil || modName == nil || folder == nil)
  puts "Folder, Mod name, and Language required"
  puts "Usage: <script name> <folder> <mod name> <lang name>"
else
  guides_linked_to = []
  Dir[folder + "/" + lang + '/**/*'].reject {|fn| File.directory?(fn) }.each { |path|
    text = File.read(path)
    
    elements = text.split(/<<|>>/)
    
    isTag = false
    
    elements.each do |element|
      
      if(isTag)
        protocol, data = element.split(':', 2)
        if(protocol.downcase == 'guide')
          link = data.split('|')[1]
          mod, name = link.split(":", 2)
          
          if(mod == modName)
            guides_linked_to << name
          end
        end
      end
      
      isTag = !isTag
    end
  }
  guides_linked_to.uniq!
  guides_linked_to.each { |name|
    unless(File.exists?(folder + "/" + lang + "/" + name + ".txt"))
      unmade.puts name
    end
  }
  
end

unmade.close()