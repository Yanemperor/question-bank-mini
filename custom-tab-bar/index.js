import TabMenu from './data';
// Component({
//   data: {
//     active: 0,
//     list: TabMenu,
//     theme: {
//       custom: {
//         colorPrimary: '#333',
//       },
//     }
//   },

//   methods: {
//     onChange(event) {
//       // event.detail 的值为当前选中项的索引
//       this.setData({
//         active: event.detail
//       });

//       wx.switchTab({
//         url: this.data.list[event.detail].url.startsWith('/') ?
//           this.data.list[event.detail].url : `/${this.data.list[event.detail].url}`,
//       });
//     },

//     // init() {
//     //   const page = getCurrentPages().pop();
//     //   const route = page ? page.route.split('?')[0] : '';
//     //   const active = this.data.list.findIndex(
//     //     (item) =>
//     //     (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
//     //     `${route}`,
//     //   );
//     //   this.setData({
//     //     active
//     //   });
//     // },
//   },
// });


Component({
  data: {
    active: 0,
    list: TabMenu,
  },

  methods: {
    onChange(event) {
      this.setData({
        active: event.detail
      });
      console.log(this.data.list[event.detail].url);
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});