'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var REQUEST_URL = 'http://jsonplaceholder.typicode.com/comments';

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPost}
        style={styles.listview}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

  renderPost(post) {
    return (
      <View style={styles.container}>
        <View style={styles.rightcontainer}>
          <Text style={styles.header}>{"Reply #"}{post.id}{" - "}{post.email}</Text>
          <Text style={styles.title}>{post.name}</Text>
          <Text style={styles.content}>{post.body}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightcontainer: {
    flex: 1,
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color:'black',
  },
    content: {
    textAlign: 'left',
    fontSize: 21,
    color:'black',
  },
  header: {
    fontSize: 18,
    marginTop: 35,
  },
  listview: {
    paddingLeft: 30,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);