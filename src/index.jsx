/** @jsx React.DOM **/
var React = require('react');

var Sprint = React.createClass({
    getDefaultProps: function() {
	return({
	    data: [
{"Id":1,"Start":"20140101000000","End":"20140109000000","Teams":[{"Id":1,"Name":"Red","SprintId":"1","Stories":[{"Id":1,"Name":"Omnibox","TeamId":"1","Tasks":[{"Id":1,"Title":"","AssignedTo":{"Id":1,"Name":"Tiffany","CreatedAt":"0001-01-01T00:00:00Z","UpdatedAt":"2014-10-10T01:23:33Z"},"UserId":"1","StoryId":"1","Total":"6","Remaining":"4","Status":"","CreatedAt":"2014-10-09T00:00:00Z","UpdatedAt":"2014-10-09T00:00:00Z"}],"CreatedAt":"2014-10-09T00:00:00Z","UpdatedAt":"2014-10-09T00:00:00Z"},{"Id":2,"Name":"Maps","TeamId":"1","Tasks":null,"CreatedAt":"2014-10-09T00:00:00Z","UpdatedAt":"2014-10-09T00:00:00Z"}],"CreatedAt":"2014-10-09T00:00:00Z","UpdatedAt":"2014-10-09T00:00:00Z"},{"Id":2,"Name":"Blue","SprintId":"1","Stories":[{"Id":3,"Name":"Sponsors","TeamId":"2","Tasks":null,"CreatedAt":"2014-10-09T00:00:00Z","UpdatedAt":"2014-10-09T00:00:00Z"}],"CreatedAt":"2014-10-09T00:00:00Z","UpdatedAt":"2014-10-09T00:00:00Z"}],"CreatedAt":"2014-10-09T00:00:00Z","UpdatedAt":"2014-10-09T00:00:00Z"}
	    ]
	});
    },
    getInitialState: function() {
	var currentSprintId = 1;
	return ({
	    data: this.props.data,
	    currentTeamId: this.props.data[0].Id,
	    currentSprintId: currentSprintId,
	    stories: []
	});
    },
    addNewStory: function(event) {
	var currStories = this.state.stories;
	var blankStory = {name: 'New story'};
	this.setState({stories: currStories.concat(blankStory)})
    },
    handleChange: function(event, index) {
	var newStories = this.state.stories;
	newStories[index].name = event.target.value;
	this.setState({stories: newStories});	
    },
    shouldShowUp: function(index) {
	return index !== 0;
    },
    shouldShowDown: function(index) {
	var len = this.state.stories.length;
	return index < (len - 1);
    },
    onHandleMoveUp: function(index) {
	var ordStories = this.state.stories;
	var temp = ordStories[index];
	ordStories[index] = ordStories[index - 1];
	ordStories[index - 1] = temp;
	this.setState({stories: ordStories});
    },	
    onHandleMoveDown: function(index) {
	var ordStories = this.state.stories;
	var temp = ordStories[index];
	ordStories[index] = ordStories[index + 1];
	ordStories[index + 1] = temp;
	this.setState({stories: ordStories});	
    },
    onDelete: function(index) {
	var newStories = this.state.stories.filter(function(story, i) {
	    return i !== index;
	});
	this.setState({stories: newStories});
    },
    elementSprintTeamButtons: function() {
	var that = this;
	return (
	    this.state.data.map(function(d) {
		return(
		    <div className="select-team button" key={d.Id} onClick={function(e) {that.selectSprintTeam(e, d.Id)}} />
		)
	    })
	);
    },
    selectSprintTeam: function(event, id) {
	this.setState({currentTeamId: id});
    },
    render: function() {
	var that = this;
	var activeSprint = this.state.data.filter(function(d, i) {
	   return d.Id === that.state.currentSprintId;
	})[0];
	var sprintShown = activeSprint.Teams.filter(function(d, i) {
	   return d.Id === that.state.currentTeamId;
	})[0];
	var storyNodes = sprintShown.Stories.map(function(story, i) {
	    return(
		<div>
		<Story
		storyName={story.name}
		index={i}
		handleChange={that.handleChange}
		showUpButton={that.shouldShowUp(i)}
		showDownButton={that.shouldShowDown(i)}
		onHandleMoveUp={that.onHandleMoveUp.bind(that, i)}
  		onHandleMoveDown={that.onHandleMoveDown.bind(that, i)}
		onDelete={that.onDelete.bind(that, i)}
		/>
		</div>
	    )
	});
	return (
	    <div className='sprint'>
	    {that.elementSprintTeamButtons()}
	    <div className='story-add button' onClick={this.addNewStory} />	    
	    {storyNodes}
	</div>
	);
    }
});

var Story = React.createClass({
    getInitialState: function() {
	return ({
	    tasks: [],
	    storyName: this.props.storyName
	});
    },
    handleTaskNameChange: function(event, index) {
	var newTasks = this.state.tasks;
	console.log(newTasks, index, event.target.value, event.currentTarget.value)
	newTasks[index].name = event.target.value;
	this.setState({tasks: newTasks});		
    },
    handleTaskPtsTotalChange: function(event, index) {
	var newTasks = this.state.tasks;
	console.log(index, newTasks);
	newTasks[index].ptsTotal = event.target.value;
	this.setState({tasks: newTasks});		
    },
    handleTaskPtsRemainChange: function(event, index) {
	var newTasks = this.state.tasks;
	newTasks[index].ptsRemain = event.target.value;
	this.setState({tasks: newTasks});		
    },
    handleTaskUserChange: function(event, index) {
	var newTasks = this.state.tasks;
	newTasks[index].user = event.target.value;
	this.setState({tasks: newTasks});
    },
    handleTaskNotesChange: function(event, index) {
	var newTasks = this.state.tasks;
	newTasks[index].notes = event.target.value;
	this.setState({tasks: newTasks});		
    },
    addNewTask: function(event) {
	var currTasks = this.state.tasks;
	var blankTask = {name: 'New task'};
	this.setState({tasks: currTasks.concat(blankTask)})
    },
    onTaskDelete: function(index) {
	var newTasks = this.state.tasks.filter(function(task, i) {
	    return i !== index;
	});
	this.setState({tasks: newTasks});	
    },
    shouldShowUpTask: function(index) {
	return index !== 0;
    },
    shouldShowDownTask: function(index) {
	var len = this.state.tasks.length;
	return index < (len - 1);
    },
    onHandleMoveUpTask: function(index) {
	var ordTasks = this.state.tasks;
	var temp = ordTasks[index];
	ordTasks[index] = ordTasks[index - 1];
	ordTasks[index - 1] = temp;
	this.setState({tasks: ordTasks});
    },	
    onHandleMoveDownTask: function (index) {
	var ordTasks = this.state.tasks;
	var temp = ordTasks[index];
	ordTasks[index] = ordTasks[index + 1];
	ordTasks[index + 1] = temp;
	this.setState({tasks: ordTasks});
    },
    elementMoveButtons: function() {
	if (this.props.showUpButton && this.props.showDownButton) {
	    return (
		<div className="story-buttons">
		<div className='move-up button' onClick={this.props.onHandleMoveUp} />
		<div className='move-down button' onClick={this.props.onHandleMoveDown} />
		</div>
	    );
	} else if (this.props.showUpButton) {
	    return (
		<div className="story-buttons">
		<div className='move-up button' onClick={this.props.onHandleMoveUp} />
		</div>
	    );
	} else if (this.props.showDownButton) {
	    return (
		<div className="story-buttons">
		<div className='move-down button' onClick={this.props.onHandleMoveDown} />
		</div>
	    );	    
	}
    },
    render: function() {
	var that = this;
	var taskNodes = this.state.tasks.map(function(task, i) {
	    console.log(task.name)
	    return (
		<TaskItem
		index={i}
		taskName={task.name}
		taskPtsTotal={task.ptsTotal}
		taskPtsRemain={task.ptsRemain}
		taskUser={task.user}
		taskNotes={task.notes}
		handleChangeName={that.handleTaskNameChange}
		handleChangePtsTotal={that.handleTaskPtsTotalChange}
		handleChangePtsRemain={that.handleTaskPtsRemainChange}
		handleChangeUser={that.handleTaskUserChange}
		handleChangeNotes={that.handleTaskNotesChange}
		showUpButton={that.shouldShowUpTask(i)}
		showDownButton={that.shouldShowDownTask(i)}
		onHandleMoveUp={that.onHandleMoveUpTask.bind(that, i)}
  		onHandleMoveDown={that.onHandleMoveDownTask.bind(that, i)}
		onDelete={that.onTaskDelete.bind(that, i)}
		/>
	    );
	});
	return (
	    <div className="story">
	    {this.elementMoveButtons()}
	    <input
	    value={this.props.storyName}
	    onChange={function(e) {that.props.handleChange(e, that.props.index)}}
	    />
	    <div className='delete button' onClick={this.props.onDelete} />
	    {taskNodes}
	    <div className='add-task button' onClick={this.addNewTask} />
	    </div>
	);
    }
});

var TaskItem = React.createClass({
    getInitialState: function() {
	return {
	    index: this.props.index
	};
    },
    elementMoveButtons: function() {
	console.log(this.props);
	if (this.props.showUpButton && this.props.showDownButton) {
	    return (
		<div className="task-buttons">
		<div className='move-up button' onClick={this.props.onHandleMoveUp} />
		<div className='move-down button' onClick={this.props.onHandleMoveDown} />
		</div>
	    );
	} else if (this.props.showUpButton) {
	    return (
		<div className="task-buttons">
		<div className='move-up button' onClick={this.props.onHandleMoveUp} />
		</div>
	    );
	} else if (this.props.showDownButton) {
	    return (
		<div className="task-buttons">
		<div className='move-down button' onClick={this.props.onHandleMoveDown} />
		</div>
	    );	    
	}
    },
    render: function() {
	var that = this;
	return (
	    <div className="task-item">
	    {this.elementMoveButtons()}
  	    <TaskName
	    index={this.props.index}
	    taskName={that.props.taskName}
	    handleChangeName={that.props.handleChangeName}
	    />
	    <TaskPts
	    index={this.props.index}	    
	    taskPtsTotal={that.props.taskPtsTotal}
	    taskPtsRemain={that.props.taskPtsRemain}
	    handleChangeTotal={that.props.handleChangePtsTotal}
	    handleChangeRemain={that.props.handleChangePtsRemain}
	    />
	    <TaskUser
	    index={this.props.index}	    
	    taskUser={that.props.taskUser}
	    handleChangeUser={that.props.handleChangeUser}
	    />
	    <TaskNotes
	    index={this.props.index}
	    taskNotes={that.props.taskNotes}
	    handleChangeNotes={that.props.handleCHangeNotes}
	    />
	    <div className="delete button" onClick={this.props.onDelete} />
	    </div>
	);
    }
});

var TaskName = React.createClass({
    getInitialState: function() {
	return {
	    taskId: this.props.taskId,
	    taskName: this.props.taskName
	};
    },
    updateData: function() {
	// send post request to server
	var taskId = this.state.taskId;
    },
    render: function() {
	var that = this;
	var taskName = this.props.taskName;
	return (
	    <input ref="taskName" value={taskName} onChange={function(e) {that.props.handleChangeName(e, that.props.index)}} />
	);
    }
});

var TaskPts = React.createClass({
    getInitialState: function() {
	return {
	    taskId: this.props.taskId,
	    taskPtsTotal: '',
	    taskPtsRemain: ''
	};
    },
    updateData: function() {
	// send post request to server
	var taskId = this.state.taskId;
    },
    handleChangeTotal: function(event) {
	this.setState({taskPtsTotal: event.target.value});
	this.setState({taskPtsRemain: event.target.value});
	this.updateData();
    },
    handleChangeRemain: function(event) {
	this.setState({taskPtsRemain: event.target.value});
	this.updateData();
    },
    render: function() {
	var taskPtsTotal = this.props.taskPtsTotal;
	var taskPtsRemain = this.props.taskPtsRemain;
	var that = this;
	return (
	    <div>
	      <input ref="taskPtsTotal" value={taskPtsTotal} onChange={function(e) {that.props.handleChangeTotal(e, that.props.index)}} />	    
	      <input ref="taskPtsRemain" value={taskPtsRemain} onChange={function(e) {that.props.handleChangeRemain(e, that.props.index)}} />
	    </div>
	);
    }
});

var TaskUser = React.createClass({
    getInitialState: function() {
	return {
	    taskId: this.props.taskId,
	    taskUser: this.props.taskUser
	};
    },
    updateData: function() {
	// send post request to server
	var taskId = this.state.taskId;
    },
    render: function() {
	var taskUser = this.state.taskUser;
	var that = this;
	return (
	    <input ref="taskUser" value={taskUser} onChange={function(e) {that.props.handleChangeUser(e, that.props.index)}} />
	);
    }
});

var TaskNotes = React.createClass({
    getInitialState: function() {
	return {
	    taskId: this.props.taskId,
	    taskNotes: this.props.taskNotes
	};
    },
    updateData: function() {
	// send post request to server
	var taskId = this.state.taskId;
    },
    render: function() {
	var taskNotes = this.state.taskNotes;
	var that = this;
	return (
	    <input ref="taskNotes" value={taskNotes} onChange={function(e) {that.props.handleChangeNotes(e, that.props.index)}} />
	);
    }
});

React.renderComponent(
    <Sprint />,
    document.getElementById('sprint-outline')
);

