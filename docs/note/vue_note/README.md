# Vue

**!!!数据驱动视图!!!**

## 使用脚手架工具 vue-cli

到想要生成项目的目录下用`vue creat "自定义名字"`生成一个名为 name 的项目，按指示操作。之后使用`cd name`指令进入生成项目的文件内，输入`npm run serve`，将 vue 项目运行，成功执行后，输入http://localhost:8080,即可看到一个vue 应用。

## 模板语法

- 在 html 中可以使用模板语法：

  - 双花括号插值**且双花括号内可以使用 JavaScript 语法**

  ```html
  <div id="app">
    <input type="text" v-model="msg" />
    <p>{{msg}}</p>
  </div>
  <script>
    var app = new Vue({
      el: "#app", //el: 挂载点

      data: {
        //data:数据选项

        msg: "hello",
      },
    });
  </script>
  ```

  - **指令**-_是带有`v-`前缀的特殊特性_

    - 在标签中插入特定字符，可以实现不同效果

      - `<p v-once>msg：{{msg}}</p>` 使用**v-one**指令，则当数据改变时，插值处的内容**不会更新**

      - `<div id="app" v-html="msg"></div>`使用**v-html**指令，则当`msg`为 html 时，会自动渲染成 html

      - `<div v-bind:class="syl-vue-course"></div>`使用**v-bind**指令，可以对标签内**属性**进行绑定和修改。**可以用简写**`<div :class='syl-vue-couse'></div>`，即省略了`v-bind`，用`:`代替。

      - `<p v-if="display">你好，实验楼</p>` 使用**v-if**指令，可以条件性地渲染一块内容。只有在 v-if 地表达式返回除了 false,0,"",null,undefined,NaN 以外的值时才会被渲染。

      - `<p v-if="display">你好，实验楼</p> <p v-else>SYL</p>`与 v-if 搭配使用的**v-else**，**注意**，v-else 元素必须紧跟在带 v-if 或者 v-else-if 元素后面，否则不会被识别

      - `<p v-show="show">你好，实验楼</p>` **v-show**指令与 v-if 类似，但他只是在 display 属性上进行了修改，仍然存在于 DOM 结构中，而 v-if 不存在于 DOM 结构中。

      - `<input v-model='username' type='text '>` **v-model**指令用于表单元素中，是**语法糖**，他等价于`@input='username=$event.target.value' :value='username'`即起到了绑定 input 事件并将输入的内容与表单元素 value 相绑定。因此`v-model='t'`则 t 为变量，与输入的内容相绑定。

      - `<button v-on:click="handleClick">点我</button>`使用**v-on**指令，可以监听 DOM 事件，**注意，此时`handleClick`应属于`methods`**，**可以使用简写**`<button @click="handleClick">点我</button>`,用`@`代替 v-on:。

        例:

        ```javascript
        <div id="app">
               <p>我叫：{{name}}</p>
                <!-- handleClick 使我们在实例 methods 中写的方法 -->
               <button v-on:click="handleClick">点我</button>
        </div>
        <script>
                var app = new Vue({
                    el:'#app',
                    data:{
                        name:'实验楼'
                    },
                    methods: {//实例方法对象
                        handleClick:function(){
                           this.name = this.name.split('').reverse().join('')
                        }
                    },
                })
        </script>
        ```

      - **修饰符**

        事件修饰符

        - `.prevent`，作用与原生`event.preventDefault()`功能一致，可以阻止事件默认行为。用法：

          ```javascript
          <form action="/" v-on:submit.prevent="submit">//在绑定的事件后加事件修饰符
                      <button type="submit">提交</button>
          </form>
          ```

        - `.stop`(阻止事件冒泡)

        - `.capture`（添加事件监听器时使用事件捕获模式）

        - `.self`（只当在 event.target 是当前元素自身时触发处理函数 ）

        - `.once`（点击事件将只会触发一次）

        - `.passive`（滚动事件的默认行为 (即滚动行为) 将会立即触发 ）

        键盘事件修饰符

      - `.enter`

      - `.tab`

      - `.delete`捕获删除和退格键

        鼠标事件修饰符

      - `.left` 点击鼠标左键

      - `.right` 右键

      - `.middle` 滚轮

  - **计算属性**--需要通过其他数据计算获得的数据设为计算属性

    计算属性中包含 setter 和 getter

    - getter：在计算属性被直接调用时，调用 get 方法

    - setter：在计算属性被赋值时，调用 set 方法

    - 例：

      ```javascript
      <body>
          <div id="app">
              <p>firstName:{{firstName}}</p>
              <p>lastName:{{lastName}}</p>
              <p>全名是:{{fullName}}</p>
              <button v-on:click="changeName">改姓</button>
          </div>
          <script>
              var app = new Vue({
                  el:'#app',
                  data:{
                      firstName:'王',
                      lastName:'花花'
                  },
                  methods: {
                      //changeName 定义一个方法改变 计算属性 fullName 的值
                      changeName:function(){
                          //修改计算属性 fullName 等于李花花
                          this.fullName = '李花花'
                          //上面一句等于触发了 fullName 属性的 setter
                      }
                  },
                  computed: {
                      fullName:{
                          //getter
                          get:function(){
                              return this.firstName+this.lastName
                          },
                          //setter  直接改变计算属性 fullName的值就可以触发setter this.fullName='XX'
                          set:function(newName){
                              var name = newName
                              this.firstName = name.slice(0,1) //取新值的第一个字符
                              this.lastName = name.slice(1) //从新值的第二个字符开始取值
                          }
                      }
                  }
              })
          </script>
      </body>
      ```

  - 侦听属性--用于在监听的数据**变化**时做出响应

    - 在实例中的`watch`属性中确定侦听项

      对于上述例子可以改为：

      ```javascript
      <script>
          var app = new Vue({
                  el:'#app',
                  data:{
                      firstName:'王',
                      lastName:'花花',
                      fullname:'王花花'
                  },
                  methods: {
                      changeName:function(){
                          this.fullName = '李花花'//数据变化时调用侦听属性中该属性的函数
                      }
                  },
              	watch:{
                      fullname:function(val){
                          var name=val;
                          this.firstName=val.slice(0,1);
                          this.lastName=val.slice(1);
                      }
                  }

              })
        </script>
      ```

  - 过滤器--用来处理数据过滤,用在双花括号插值和 v-bind 表达式中

    - ```javascript
      <p>{{msg2|getString}}</p>
      ```

     <p v-bind:class="msg2|getString"></p>

* 需要过滤的数据用 **|** 与过滤器分割 **（data|fliter）**

  例：

  ```javascript
  <body>
      <div id="app">
          <!-- toUpperCase   getString  为自定义的过滤器-->
          <p>小写转换大写：过滤前：{{msg}} 过滤后： {{msg|toUpperCase}}</p>
          <p>去除数字：过滤前：{{msg2}} 过滤后： {{msg2|getString}}</p>
      </div>
      <script>
          var app = new Vue({
              el:'#app',
              data:{
                  msg:'hello',
                  msg2:'1s2y3l'
              },
              // filters 过滤器选项
              filters:{
                  //toUpperCase 定义一个字符串转大写的过滤器
                  toUpperCase:function(val){
                      return val.toUpperCase();
                  },
                  //getString 定义一个获取去除数字的过滤器
                  getString:function(val){
                      let newVal = '';
                      val.split('').map(function(item){
                          if(9>=item&&item>=0){
                              return;
                          }else{
                              return newVal+=item;
                          }
                      })
                      return newVal;
                  }
              }
          })
      </script>
  </body>
  ```

## 过渡动画

- ![过渡动画](https://doc.shiyanlou.com/document-uid940410labid10292timestamp1552641276983.png/wm)

```javascript
.v-enter,.v-leave-to{
        /* 定义元素默认状态 例如：opacity:0*/
    }
    .v-enter-to,.v-leave{
        /* 定义元素激活时状态 例如：opacity:1*/
    }
    .v-enter-active,.v-leave-active{
        /* 定义过渡或动画，在过渡中的状态 */
        /*
        最常用的就是在这里面指定过渡动画 时间/延迟/曲线函数
        transition:opacity:1s 1s ease-in-out
        */
    }
```

## 生命周期

> https://blog.csdn.net/wasbb_mm/article/details/83861456

![Vue 实例生命周期](https://cn.vuejs.org/images/lifecycle.png)

- **生命周期钩子函数**

  > beforeCreate() 创建前，此时有 vue 实例，但 el,data,methods 等数据还未注入
  >
  > created() 创建后，此时有 vue 对象，data,methods 数据也已经注入,**但 el 还未注入**
  >
  > beforeMount() 载入前，完成了 data 和 el 的数据初始化
  >
  > mounted() 载入后，已经将 vue 实例中的 data 里的 message 挂载到 BOM 节点中
  >
  > beforeUpdata() 更新状态前，**是 view 层数据变化前，不是 data 中的数据变化前。仅属于 data 中的数据改变无法触发**
  >
  > updated() 更新状态后，数据已经更改完成
  >
  > beforeDestroy() 销毁前
  >
  > destroyed() 销毁后

## 组件

- 全局注册,可以用在任何新创建的 Vue 根实例（`new Vue`）的模板中

  ```javascript
  Vue.component("组件名", {
    //组件内容。。。
    template: `<div><h1>随便写点</h1></div>`,
  });
  ```

  局部注册，在根实例中在`components`选项中定义

  ```javascript
  var X={
      //组件内容。。。
      template:`<div><h1>随便写点</h1></div>`
      data:function(){
          return{
              ():...
          }
      }
  })
  new Vue({
      el:'#app',
      components:{
          X//X为局部定义的组件
      }
  })
  ```

- 父子间传值

  - 父传子:

    - 1.通过`props属性` **注意：** props 中定义的数据名若为**驼峰命名法**,因为 html 属性**不区分大小写**，则在 html 中定义时，需要用`-`连接大小写处

    ```javascript
    <div id="app">
            <ul>
                <schools v-for="(item, index) in items" @event='changeEvent' :key="index" :school-name='item'></schools>   //定义需要传入的数据并进行赋值
            </ul>
            <h4>{{school}}</h4>
    </div>
    <script>
    Vue.component('schools', {//全局注册的组件
                props: ['schoolName'],//父传子，通过props属性定义接收的数据
                template: `<li>
                    <h4>{{schoolName}}</h4>
                    <button @click='cschool'>选择</button>
                    </li>
                    `,
                methods: {
                    cschool: function () {
                        console.log(this.schoolName);
                        this.$emit('event', [this.schoolName]);
                    }
                },

            })
    var app = new Vue({//根实例
                el: '#app',
                data: {
                    items: ['中大', '浙大', '深大'],
                    school: []
                },
                methods: {
                    changeEvent: function (data) {//起到接收子组件信息的作用
                        console.log('触发', data);
                        this.school = data;
                    }
                },
            })
    </script>
    ```

    其中,动态传递为：

    ```javascript
    :school-name:'item'  //item为变量名
    ```

    静态传递为：

    ```javascript
    school-name:'s'  //s应为静态的值
    ```

    - 使用`this.$parent`直接调用父组件进行数据操作。

  - 子传父：

    - 1.通过在**模板**中绑定事件，在子组件 methods 中定义该事件函数，在该函数内通过`this.$emit('自定义事件名称',[传参])`的方法，自定义一个事件和事件名，在**根实例**中绑定该事件，并定义事件函数，从而起到传递的效果。

    - 2.通过在父组件中定义一个函数，将该函数传入子组件中，再通过在子组件内调用该函数，从而起到子组件间接传递数据给父组件的效果：

      ```javascript
      <div id="app">
              <ul>
                  <schools v-for="(item, index) in items" :func='changeEvent' :key="index" :school-name='item'></schools>
              </ul>
              <h4>{{school}}</h4>
          </div>
          <script>
              Vue.component('schools', {
                  props: ['schoolName', 'func'],//func用来接收父组件传的函数
                  template: `<li>
                      <h4>{{schoolName}}</h4>
                      <button @click='cschool'>选择</button>
                      </li>
                      `,
                  methods: {
                      cschool: function () {
                          console.log(this.schoolName);
                          this.func(this.schoolName);//func函数现在已经等价于父组件中changeEvent函数
                      }
                  },

              })

              var app = new Vue({
                  el: '#app',
                  data: {
                      items: ['中大', '浙大', '深大'],
                      school: []
                  },
                  methods: {
                      changeEvent: function (data) {
                          this.school = data;
                      }
                  },
              })
          </script>
      ```

## Vuex

- Vuex 可以看作是管理全局变量，全局函数的仓库。本质都是围绕**数据驱动视图**的核心进行，state 与 getters 是类似 data 和 computed，mutations 和 actions 都用来存放改变数据的方法。

  使用 mapStatus，mapGetters 等映射函数时，是将`this.方法名()`映射为`this.$store.(...)`，因此调用时可以直接用`this.方法名()`的方式进行调用：

  ```javascript
  import { mapMutations } from "vuex";

  export default {
    // ...
    methods: {
      ...mapMutations([
        "increment", // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
        "incrementBy", // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ]),
      ...mapMutations({
        add: "increment", // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      }),
    },
  };
  ```

* `state`：用来存放公共数据,类似`data`，在组件中访问 state 数据的方式：

  ```javascript
  //第一种，用mapState访问
  import{
      mapState
  } from 'vuex'
  var mapStateData=mapState(['id','msg']);
  computed:{
      ...mapStateData
  }
  //第二种，用mapState访问
  import{
      mapState
  } from 'vuex'
  computed:{
      ...mapState(['id','msg'])
  }
  //第三种,调用函数访问(不推荐)
  computed:{
      id:function(){
          return this.$store.state.id
      }
  }
  ```

* `getters` :用来存放计算型数据，类似`computed`

  存放方式：

  ```javascript
  //函数默认传入state对象
  getters:{
      msgrevese: (state) => {
        return state.msg.split('').reverse().join('');
      },
      jo: (state) => {//闭包
        return function (val) {
          return state.msg + val;
        }
      }
  }
  ```

  访问方式：

  ```javascript
  //第一种，用mapGetters访问
  import{
      mapState,
      mapGetters
  } from 'vuex'
  var mapGettersData=mapState(['msgrevese']);
  computed:{
      ...mapGettersData
  }
  //第二种用mapGetters访问
  import{
      mapState,
      mapGetters
  } from 'vuex'
  computed:{
      ...mapGetters(['msgrevese'])
  }
  //第三种直接调用
  computed:{
      getmsg:function(){
          return this.$store.getters.jo('abc') //state.msg+'abc'
      }
  }
  ```

* `mutations`用来存放方法，类似`methods`,但需要将其看做事件来**触发**，触发方式为`this.$store.commit('mutations方法名','需要传入的值')`

  **注意:该方法只能放同步方法，不能放异步方法**

  ```javascript
  mutations: {
      setNum(state, val) {
        state.num = val;
      }
    },
  //默认传入state
  ```

  ```javascript
  //调用方式1
  methods:{
      changeEvent:function(e){
          this.$store.commit('setNum',e.target.value)
      }
  }
  //用mapMutations调用
  import{
      mapState,
      mapGetters,
      mapMutations
  } from 'vuex'
  methods:{
      ...mapMutations(['setNum'])
  }
  ```

* `actions`用来存放异步方法

  Action 函数接受一个**与 store 实例具有相同方法和属性的 context 对象**，因此可以调用 context.commit 提交一个 `mutation`，或者通过 context.state 和 context.getters 来获取 state 和 getters。

  ```javascript
  mutations:{
      setDuanzi(state, val) {
        state.duanzi = val;
      }
  }

  actions: {
      setTp(content) {
        let url = 'https://free-api.heweather.net/s6/weather/now?location=beijing&key=b606ea979260444590a4e0024d216fc5'
        fetch(url).then(res => res.json()).then(res => {
          var val = res.HeWeather6[0].basic.location
          content.commit('setDuanzi', val)//调用mutations中setDuanzi方法
        })
      }
    },
  ```

  在组件中调用 action 方法的方式`this.$store.dispatch('方法名')`：

  ```javascript
  //调用方式1
  methods:{
      getDuanzi() {
         this.$store.dispatch('setTp')
       }
  }
  //使用mapActions调用
  import{
      mapState,
      mapGetters,
      mapMutations,
      mapActions
  } from 'vuex'

  methods:{
      ...mapActions(['setTp'])
  }
  ```
