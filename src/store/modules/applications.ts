const storeApplications = {

  namespaced: true,
  
  state: {

    applications: [
      { 
          name: 'Photoshop', 
          category: 1, 
          imgurl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
          appUrl: '/Applications/Adobe Photoshop 2021/Adobe Photoshop 2021.app'
      },
      { 
          name: 'InDesign', 
          category: 1, 
          imgurl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg',
          appUrl: '"C:\\Program Files\\Adobe\\Adobe InDesign 2020\\InDesign.exe"'
      },
      { 
          name: 'Illustrator', 
          category: 1, 
          imgurl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg',
          appUrl: '"C:\\Program Files\\Adobe\\Adobe Illustrator 2020\\Support Files\\Contents\\Windows\\Illustrator.exe"'},
      { 
          name: 'Sony Vegas', 
          category: 2, 
          imgurl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Vegas_Pro_15.0.png',
          appUrl: '"C:\\Program Files\\VEGAS\\VEGAS Pro 15.0\\vegas150.exe"'
      },
      { 
          name: 'VS Code', 
          category: 3, 
          imgurl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg',
          appUrl: '"C:\\Users\\pisso\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"'
      },
      { 
          name: 'Behance', 
          category: 1, 
          imgurl: 'https://cdn-icons-png.flaticon.com/512/48/48975.png',
          appUrl: 'https://www.behance.net/'
      },
    ],

  },
  
  getters: {

  },
  
  mutations: {

    SET_APPLICATION(state: any, payload: any) {
      state.applications.push(payload)
    }
    
  },
  
  actions: {

    addItem(context: any, payload: any) {
      context.commit('SET_APPLICATION', payload)
    }
    
  }

}

export default storeApplications