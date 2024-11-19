(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{339:function(s,a,e){"use strict";e.r(a);var t=e(1),n=Object(t.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"_1-前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-前言"}},[s._v("#")]),s._v(" 1. 前言")]),s._v(" "),a("p",[s._v("  假如我在聊天软件给好友发送了“我想买一个剃须刀”，在打开购物软件之后，首页就给推荐了各个款式、价位的剃须刀，在不考虑隐私性的前提下，这种方式是不是给用户极大的便利呢。如果要实现上述功能，很关键的一步是确定在两个软件间为同一个人使用，即两个软件间的ID打通，也叫ID-Mapping，也是我们常说的OneID。")]),s._v(" "),a("h2",{attrs:{id:"_2-概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-概念"}},[s._v("#")]),s._v(" 2. 概念")]),s._v(" "),a("p",[s._v("  ID-Mapping就是将设备ID（例如手机MAC地址、IMEI信息等），用户ID（例如手机号、邮箱地址、身份证号等）等信息，结合标签体系、知识图谱、机器学习等算法，将各种ID映射到统一的ID上去，可以通过该ID找到同一用户登录的所有信息。"),a("br"),s._v("\n  简单来说，OneID就是各个系统间ID的关联打通的结果标识，从而消除"),a("strong",[s._v("数据孤岛")]),s._v("，让数据发挥最大的价值。")]),s._v(" "),a("h2",{attrs:{id:"_3-技术难点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-技术难点"}},[s._v("#")]),s._v(" 3. 技术难点")]),s._v(" "),a("ol",[a("li",[s._v("ID种类比较多，可能一个系统就有多个ID标识一个用户或者一个设备。")]),s._v(" "),a("li",[s._v("历史原因导致系统本身存在数据孤岛，很难和其他系统打通。")]),s._v(" "),a("li",[s._v("不同系统间关联关系强弱是不同的，不可过度关联导致“大众脸”。")])]),s._v(" "),a("h2",{attrs:{id:"_4-技术选型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-技术选型"}},[s._v("#")]),s._v(" 4. 技术选型")]),s._v(" "),a("center",[a("img",{attrs:{src:"/donot-eat-fish/img/user_profile/11.OneID/image-1.png",width:"60%",height:"40%"}})]),s._v(" "),a("h2",{attrs:{id:"_5-技术实现"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-技术实现"}},[s._v("#")]),s._v(" 5. 技术实现")]),s._v(" "),a("p",[s._v("  我们的目的是根据不同系统间ID的关联关系，为每一个存在关联关系的ID生成同一个标识，即OneID，以此可以使用OneID找到该用户相关的所有信息，丰富用户画像标签，为业务提供强有力的数据支撑。")]),s._v(" "),a("h3",{attrs:{id:"_5-1-业务数据入湖"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-业务数据入湖"}},[s._v("#")]),s._v(" 5.1 业务数据入湖")]),s._v(" "),a("p",[s._v("  包含标识用户或者设备ID信息数据接入数据湖，根据不同业务系统ID间关联关系强弱分配权重，该权重可用于后续OneID生成数据源的过滤，根据不同的使用场景选取不同权重生成OneID。例如，在识别精准度要求较高的场景下，可使用高权重或者权重大于一定阈值的ID数据进行后续计算，如用于风控或精准推荐的场景；但是在一些广告推送的场景下，目的就是让更多的人知晓产品的一些更新信息，这种场景下，就可以将权重阈值设置的低一些。")]),s._v(" "),a("h3",{attrs:{id:"_5-2-生成长整型id"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-生成长整型id"}},[s._v("#")]),s._v(" 5.2 生成长整型ID")]),s._v(" "),a("p",[s._v("  ID之间的关联关系可以看做一张图，每个可以关联到一起的ID集合为一个连通图，我们选用SparkGraphX图之间的关系。SparkGraphX需要图数据中每个顶点ID为长整型，但是我们能拿到的ID可能为字符串类型，比如MAC地址，邮箱，设备串号等，所以我们需要给现有的ID都添加一个全局唯一的长整型ID。"),a("br"),s._v("\n  比较方便的方法是直接取每个ID的哈希值作为顶点ID，但是这种方式会有哈希冲突的问题，如果存在哈希冲突的问题，则会造成两个完全没关系的连通图被关联在一起，且在SparkGraphX图数据输入过程中，会优先采用先读取到的顶点ID属性，即如果有两个相同的顶点ID拥有不同的属性，则会采用先读取到的那个顶点ID属性，这就会因为数据分区不同，顺序不同导致图不稳定。"),a("br"),s._v("\n  所以这里建议的做法是，使用SparkSQL DENSE_RANK()函数为数据ID生成自增ID。")]),s._v(" "),a("h3",{attrs:{id:"_5-3-生成图顶点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-生成图顶点"}},[s._v("#")]),s._v(" 5.3 生成图顶点")]),s._v(" "),a("center",[a("img",{attrs:{src:"/donot-eat-fish/img/user_profile/11.OneID/image-2.png",width:"60%",height:"40%"}})]),s._v(" "),a("p",[s._v("  图顶点包含两部分，一部分为顶点ID，即上述的长整型ID，另一部分为该顶点信息，顶点信息在后续图处理顶点之间发送消息很重要。这里我们指定图顶点ID为上述自增ID，顶点属性为ID类型和ID值组成的二元组。")]),s._v(" "),a("h3",{attrs:{id:"_5-4-生成图边"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-4-生成图边"}},[s._v("#")]),s._v(" 5.4 生成图边")]),s._v(" "),a("center",[a("img",{attrs:{src:"/donot-eat-fish/img/user_profile/11.OneID/image-3.png",width:"60%",height:"40%"}})]),s._v(" "),a("p",[s._v("  有了顶点之后，我们需要将顶点之间的关系告诉SparkGraphX，这就是图的边，在这里边就是之前提到的数据ID之间的关系，并且在Spark图计算中，图是有方向的，不过这里我们不用纠结图方向的问题，这和我们在 5.5 生成最小连通图 步骤所采用的算法有关。边也是可以携带属性信息的，但是我们这里暂且没有用到边属性，可以将数据ID间的权重作为边的属性。")]),s._v(" "),a("h3",{attrs:{id:"_5-5-生成最小连通图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-5-生成最小连通图"}},[s._v("#")]),s._v(" 5.5 生成最小连通图")]),s._v(" "),a("center",[a("img",{attrs:{src:"/donot-eat-fish/img/user_profile/11.OneID/image-4.png",width:"60%",height:"40%"}})]),s._v(" "),a("p",[s._v("  有了顶点和边之后，将图数据传给Graph对象生成图，有了图对象后，我们需要考虑的是将可以连接到一起的顶点（连通图）取出，并给处于同一连通图的所有顶点一个全局唯一标识。"),a("br"),s._v("\n  要实现上述功能，可以调用图的ConnectedComponents()方法生成最小连通图，该方法会调用Pregel算法处理图数据，将处于同一连通图所有顶点属性修改为该连通图的最小顶点ID。"),a("br"),s._v("\n  这里举个ConnectedComponents()数据处理流程。首先拿到图数据之后生成一个图，如下所示：")]),s._v(" "),a("center",[a("img",{attrs:{src:"/donot-eat-fish/img/user_profile/11.OneID/image-5.png",width:"60%",height:"40%"}})]),s._v(" "),a("p",[s._v("  然后方法内部会先将顶点属性抹去，以顶点ID作为顶点属性。")]),s._v(" "),a("center",[a("img",{attrs:{src:"/donot-eat-fish/img/user_profile/11.OneID/image-6.png",width:"60%",height:"40%"}})]),s._v(" "),a("p",[s._v("  之后顶点间发送消息，给相邻大顶点发送小顶点的属性信息（即小顶点的ID），收到消息的顶点将自身属性和消息对比，取小，若同时收到多个消息，先将消息取小，再和当前顶点属性对比。")]),s._v(" "),a("center",[a("img",{attrs:{src:"/donot-eat-fish/img/user_profile/11.OneID/image-8.png",width:"60%",height:"40%"}})]),s._v(" "),a("p",[s._v("  直到所有顶点消息发送完成，即所有顶点处于Inactive状态，图数据处理完成。")]),s._v(" "),a("center",[a("img",{attrs:{src:"/donot-eat-fish/img/user_profile/11.OneID/image-7.png",width:"60%",height:"40%"}})]),s._v(" "),a("p",[s._v("附ConnectedComponents()源码")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('object ConnectedComponents {\n  def run[VD: ClassTag, ED: ClassTag](graph: Graph[VD, ED],\n                                      maxIterations: Int): Graph[VertexId, ED] = {\n    require(maxIterations > 0, s"Maximum of iterations must be greater than 0," +\n      s" but got ${maxIterations}")\n    // 顶点属性设置为顶点ID\n    val ccGraph = graph.mapVertices { case (vid, _) => vid }\n    // 符合条件顶点发送信息，向大顶点发送小顶点ID\n    def sendMessage(edge: EdgeTriplet[VertexId, ED]): Iterator[(VertexId, VertexId)] = {\n      if (edge.srcAttr < edge.dstAttr) {\n        Iterator((edge.dstId, edge.srcAttr))\n      } else if (edge.srcAttr > edge.dstAttr) {\n        Iterator((edge.srcId, edge.dstAttr))\n      } else {\n        Iterator.empty\n      }\n    }\n    // 初始化信息\n    val initialMessage = Long.MaxValue\n    // 调用Pregel算法进行图处理\n    val pregelGraph = Pregel(ccGraph, initialMessage,\n      maxIterations\n      // 双向发送消息\n      , EdgeDirection.Either)(\n      // 顶点信息处理程序，当前顶点信息和收到信息取小\n      vprog = (id, attr, msg) => math.min(attr, msg),\n      sendMsg = sendMessage,\n      // 同时收到多条信息，取小\n      mergeMsg = (a, b) => math.min(a, b))\n    ccGraph.unpersist()\n    pregelGraph\n  } // end of connectedComponents\n\n  def run[VD: ClassTag, ED: ClassTag](graph: Graph[VD, ED]): Graph[VertexId, ED] = {\n    run(graph, Int.MaxValue)\n  }\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br")])]),a("h3",{attrs:{id:"_5-6-生成oneid"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-6-生成oneid"}},[s._v("#")]),s._v(" 5.6 生成OneID")]),s._v(" "),a("p",[s._v("  现在我们得到了最小连通图对象，该对象顶点属性一致的即为同一连通图。但是当前得到的图顶点是连通图最小的那个顶点ID，我们需要映射回原来的顶点信息，所以可以将最小连通图和最开始输入图数据生成的图进行关联。"),a("br"),s._v("\n  获取到原图属性后，按照连通图最小ID聚合，将聚合得到的数据ID装到集合中并排序，利用Java util包下的UUID对该集合取值，得到全局唯一ID，即OneID。")]),s._v(" "),a("h2",{attrs:{id:"_6-总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-总结"}},[s._v("#")]),s._v(" 6. 总结")]),s._v(" "),a("p",[s._v("  OneID生成逻辑并不复杂，实际生产中，应着重考虑数据ID间的权重，并根据应用场景选取对应的权重阈值，从而使OneID可以切实使用起来。")])],1)}),[],!1,null,null,null);a.default=n.exports}}]);