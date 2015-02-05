#!/usr/bin/env ruby
require "rexml/document"
include REXML

folder  = ARGV[0]
modName = ARGV[1]
lang    = ARGV[2]

if(lang == nil || modName == nil || folder == nil)
  puts "Folder, Mod name, and Language required"
  puts "Usage: <folder> <mod name> <lang name>"
else
  unmade = File.open(folder + "/" + 'unmade.txt', 'w+')
  guides_linked_to = []
  external_links   = {}
  Dir[folder + "/" + lang + '/**/*'].reject {|fn| File.directory?(fn) }.each { |path|
    puts "\e[31mparsing " + path + "\e[0m"
    
    text = File.read(path)
    text = '<?xml version="1.0" encoding="UTF-8"?>
    <root>' + text + '</root>'
    
    doc = Document.new text
    
    doc.root.each_element('//guide') { |elem|
      attribute = elem.attributes.get_attribute('href')
      if attribute == nil
        puts "\e[31mATTRIBUTE DOESN'T LINK ANYWHERE!\e[0m"
        next
      end
      link = attribute.value
      mod, name = link.split(":", 2)
      
      if(mod == modName)
        guides_linked_to << name
      else
        puts "external"
        external_links[mod] ||= []
        external_links[mod] << name
      end
      
    }
  }
  guides_linked_to.uniq!
  
  guides_linked_to.each { |name|
    unless(File.exists?(folder + "/" + lang + "/" + name + ".txt"))
      unmade.puts name
    end
  }
  unmade.puts
  unmade.puts
  external_links.each do |key, val| 
    val.uniq!
    unmade.puts "#{key}:"
    val.each do |name|
      unmade.puts "    #{name}"
    end
  end
  
  unmade.close()  
end

