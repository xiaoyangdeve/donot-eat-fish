(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{350:function(a,t,s){"use strict";s.r(t);var r=s(1),n=Object(r.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h2",{attrs:{id:"_1-概览"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-概览"}},[a._v("#")]),a._v(" 1. 概览")]),a._v(" "),t("h3",{attrs:{id:"_1-1-jdk体系结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-jdk体系结构"}},[a._v("#")]),a._v(" 1.1 JDK体系结构")]),a._v(" "),t("center",[t("img",{attrs:{src:"/donot-eat-fish/img/java/jvm/40010202.Java虚拟机运行时数据区/jdk_jre_jvm_relation.png",width:"80%"}})]),a._v(" "),t("h3",{attrs:{id:"_1-2-jvm组成"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-jvm组成"}},[a._v("#")]),a._v(" 1.2 JVM组成")]),a._v(" "),t("p",[a._v("Java虚拟机（JVM）在启动后就会向操作系统申请一块物理内存区域，并在逻辑上将其分为 5 大块："),t("strong",[a._v("方法区、堆、栈（虚拟机栈）、本地方法栈和程序计数器")]),a._v("。这些逻辑上的内存分区按照一定的规范各司其职，又按照一定的管理策略相互配合，使得 JVM 才可以稳定高效运行。")]),a._v(" "),t("center",[t("img",{attrs:{src:"/donot-eat-fish/img/java/jvm/40010202.Java虚拟机运行时数据区/jvm-runtime-data-areas.png",width:"80%"}})]),a._v(" "),t("h2",{attrs:{id:"_2-栈-java-virtual-machine-stacks"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-栈-java-virtual-machine-stacks"}},[a._v("#")]),a._v(" 2. 栈（Java Virtual Machine Stacks）")]),a._v(" "),t("h3",{attrs:{id:"_2-1-基本概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-基本概念"}},[a._v("#")]),a._v(" 2.1 基本概念")]),a._v(" "),t("p",[t("strong",[a._v("每个Java虚拟机线程都有一个私有的Java虚拟机堆栈，与线程同时创建")]),a._v("。Stack Area，也叫栈内存，主管 Java 程序的运行，是在线程创建时创建，它的生命期是跟随线程的生命期，线程结束栈内存也就释放，对于栈来说不存在垃圾回收问题，只要线程一结束该栈就 Over，生命周期和线程一致，是线程私有的。其中主要保存方法的局部变量和部分结果，并参与方法的调用和返回。虚拟机栈中的"),t("strong",[a._v("数据以栈帧（Stack Frame）的形式存储")]),a._v("。")]),a._v(" "),t("p",[a._v("在 Java® 虚拟机规范第一版中，Java 虚拟机堆栈被称为 Java 堆栈。")]),a._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Math")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("int")]),a._v(" initNum "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("999")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("User")]),a._v(" user "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("User")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("final")]),a._v(" datial "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("777")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n  \n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("int")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("compute")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 一个方法都对应一个栈帧内存区域")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("int")]),a._v(" a "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("int")]),a._v(" b "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("int")]),a._v(" c "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("a "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" b"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("23")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("return")]),a._v(" c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  \n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("void")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("main")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" args"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Math")]),a._v(" math "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Math")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    math"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("compute")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("System")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("out"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"math completed"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br"),t("span",{staticClass:"line-number"},[a._v("11")]),t("br"),t("span",{staticClass:"line-number"},[a._v("12")]),t("br"),t("span",{staticClass:"line-number"},[a._v("13")]),t("br"),t("span",{staticClass:"line-number"},[a._v("14")]),t("br"),t("span",{staticClass:"line-number"},[a._v("15")]),t("br"),t("span",{staticClass:"line-number"},[a._v("16")]),t("br"),t("span",{staticClass:"line-number"},[a._v("17")]),t("br"),t("span",{staticClass:"line-number"},[a._v("18")]),t("br")])]),t("h4",{attrs:{id:"_2-1-1-虚拟机栈主要存储"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-1-虚拟机栈主要存储"}},[a._v("#")]),a._v(" 2.1.1 虚拟机栈主要存储")]),a._v(" "),t("ol",[t("li",[a._v("本地变量：输入参数和输出参数以及方法内的变量。")]),a._v(" "),t("li",[a._v("栈操作：记录出栈、入栈的操作。")]),a._v(" "),t("li",[a._v("栈帧数据：包括类文件、方法等。")])]),a._v(" "),t("h4",{attrs:{id:"_2-1-2-特点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-2-特点"}},[a._v("#")]),a._v(" 2.1.2 特点")]),a._v(" "),t("ol",[t("li",[a._v("FILO，先进后出。")]),a._v(" "),t("li",[a._v("线程私有。")]),a._v(" "),t("li",[a._v("每个线程"),t("strong",[a._v("只能有一个活动栈帧")]),a._v("，对应当前正在执行的方法。")]),a._v(" "),t("li",[a._v("不存在垃圾回收。因为虚拟机栈是由栈帧组成，在方法执行完毕后，对应的栈帧就会被弹出栈，"),t("strong",[a._v("不需要垃圾回收机制")]),a._v("。")]),a._v(" "),t("li",[a._v("允许 Java 虚拟机栈的大小是"),t("strong",[a._v("动态的或者是固定")]),a._v("不变的。")]),a._v(" "),t("li",[t("strong",[a._v("栈帧过多或栈帧过大会导致栈内存溢出")]),a._v("。")]),a._v(" "),t("li",[a._v("访问速度仅次于程序计数器。")])]),a._v(" "),t("h4",{attrs:{id:"_2-1-3-常见异常"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-3-常见异常"}},[a._v("#")]),a._v(" 2.1.3 常见异常")]),a._v(" "),t("ul",[t("li",[t("strong",[a._v("StackOverflowError")]),a._v("：如果线程中的计算需要的空间超过Java虚拟机栈所允许的空间，则 Java 虚拟机会抛出 StackOverflowError。")]),a._v(" "),t("li",[t("strong",[a._v("OutOfMemoryError")]),a._v("：如果 Java 虚拟机堆栈可以动态扩展，并且尝试扩展但没有足够的内存来实现扩展，或者如果没有足够的内存来为新线程创建初始 Java 虚拟机堆栈，则 Java 虚拟机堆栈 机器抛出 OutOfMemoryError。")])]),a._v(" "),t("h3",{attrs:{id:"_2-2-栈帧"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-栈帧"}},[a._v("#")]),a._v(" 2.2 栈帧")]),a._v(" "),t("p",[a._v("虚拟机栈由一个个栈帧（Stack Frame）组成，线程里执行的每一个方法都对应一个栈帧。栈帧里包括了：")]),a._v(" "),t("ul",[t("li",[t("strong",[a._v("局部变量表")])]),a._v(" "),t("li",[t("strong",[a._v("操作数栈")])]),a._v(" "),t("li",[t("strong",[a._v("动态连接")])]),a._v(" "),t("li",[t("strong",[a._v("方法返回地址和一些额外的附加信息。")])])]),a._v(" "),t("h4",{attrs:{id:"_2-2-1-栈帧的概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-1-栈帧的概念"}},[a._v("#")]),a._v(" 2.2.1 栈帧的概念")]),a._v(" "),t("p",[a._v("Java对虚拟机栈的操作只有"),t("strong",[a._v("两个：入栈和出栈")]),a._v("，遵循FILO先进后出的原则。在一个活跃的线程中，同时只会有一个活跃的栈帧，只有当前正在执行的方法的栈帧（栈顶的那个栈帧）是有效的，这个栈帧被称为当前栈帧（Current Frame），与当前栈帧对应的方法为当前方法（Current Method），定义这个方法的类就是当前类（Current Class）。")]),a._v(" "),t("p",[a._v("执行引擎运行的字节码指令只针对当前栈帧进行操作，如果在该方法中调用了其它方法，对应的新的栈帧会被创建出来并放在栈的顶端，称为新的当前栈帧。")]),a._v(" "),t("p",[t("strong",[a._v("虚拟机栈是线程私有的，不同线程中所包含的栈帧是不允许相互引用的")]),a._v("。")]),a._v(" "),t("p",[a._v("如果当前方法被其它方法调用，方法返回的时候，当前栈帧会将此方法的执行结果给下一个栈帧，然后虚拟机会丢弃当前栈帧，使下一个栈帧称为当前栈帧。")]),a._v(" "),t("p",[a._v("无论是方法正常返回还是抛出异常，都会导致当前栈帧被弹出。")]),a._v(" "),t("center",[t("img",{attrs:{src:"/donot-eat-fish/img/java/jvm/40010202.Java虚拟机运行时数据区/stack-frame.png",width:"80%"}})]),a._v(" "),t("h4",{attrs:{id:"_2-2-2-栈帧的结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-2-栈帧的结构"}},[a._v("#")]),a._v(" 2.2.2 栈帧的结构")]),a._v(" "),t("p",[a._v("栈帧里包括了"),t("strong",[a._v("局部变量表、操作数栈、动态连接、方法返回地址")]),a._v("和一些额外的附加信息。")]),a._v(" "),t("h5",{attrs:{id:"_2-2-2-1-数据"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-2-1-数据"}},[a._v("#")]),a._v(" 2.2.2.1 数据")]),a._v(" "),t("h2",{attrs:{id:"_5-程序计数器-pc-register"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-程序计数器-pc-register"}},[a._v("#")]),a._v(" 5. 程序计数器（pc register）")]),a._v(" "),t("h3",{attrs:{id:"_5-1-基本概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-基本概念"}},[a._v("#")]),a._v(" 5.1 基本概念")]),a._v(" "),t("p",[a._v("Program Counter Register，程序计数器，有些资料也称为 PC 寄存器。每个线程都有一个程序计数器，是线程私有的，就是一个指针，指向方法区中的方法字节码（"),t("strong",[a._v("用来存储指向下一条 JVM 指令的地址")]),a._v("），由执行引擎读取下一条指令，是一个非常小的内存空间，几乎可以忽略不记。它是程序控制流的指示器，分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖程序计数器完成。")]),a._v(" "),t("h4",{attrs:{id:"_5-1-1特点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-1特点"}},[a._v("#")]),a._v(" 5.1.1特点")]),a._v(" "),t("ol",[t("li",[a._v("线程私有。")]),a._v(" "),t("li",[a._v("不存在垃圾回收。")]),a._v(" "),t("li",[t("strong",[a._v("不会发生内存溢出错误，也是唯一一个不会出现任何 OOM 的区域")]),a._v("。")]),a._v(" "),t("li",[t("strong",[a._v("如果执行的是 Java 代方法，程序计数器记录的是正在执行的虚拟机字节码指令的地址；如果执行的是一个 Native 方法，那这个计数器是空的")]),a._v("。")]),a._v(" "),t("li",[a._v("用以完成分支、循环、跳转、异常处理、线程恢复等基础功能。")])]),a._v(" "),t("p",[a._v("程序计数器为什么是私有的？")]),a._v(" "),t("p",[a._v("由于 CPU 的时间片轮换机制，多线程在并发执行的时候实际上需要 CPU 在多个线程之间不停切换，为了能够准确记录各个线程正在执行的当前字节码指令地址，最好的办法就是为每一个线程都分配一个程序计数器，这样就不会出现指令互相干扰的情况了。")])],1)}),[],!1,null,null,null);t.default=n.exports}}]);