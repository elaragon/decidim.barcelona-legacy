import { Component }          from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
  fetchDebate, 
} from './debates.actions';

import Loading              from '../application/loading.component';
import Comments             from '../comments/comments.component';

class DebateShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { session, fetchDebate } = this.props;

    fetchDebate(this.props.debateId).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div className="debate-show component">
        <Loading show={this.state.loading} />
        {this.renderDebate()}
      </div>
    );
  }

  renderDebate() {
    const { debate } = this.props;

    if (debate.id) {
      return (
        <Comments commentable={{...debate, type: 'Debate'}} />
      );
    }
    return null;
  }
}

function mapStateToProps({ session, debate }) {
  return { session, debate };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchDebate 
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DebateShow);
