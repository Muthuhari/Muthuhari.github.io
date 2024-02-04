<Modal
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
show={this.state.showProgressCreateModal}
onHide={() => this.toggleAddProgress()}
>
<Modal.Header closeButton>
  <Modal.Title>{progress?.form_display_title?progress.form_display_title:'Not available'}</Modal.Title>
</Modal.Header>

  <Modal.Body>
    {progress_loading?(
      <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <CircularProgress />
      </div>
    ):(
      <Form>
          <Row className="my-5">
            <Form.Group
              as={Col}
              md="6"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Add start date</Form.Label>

              <Form.Control
              type="datetime-local"
              name="start_date"
              placeholder="Start Date"
              onChange={this.handleChange}
              />
              {this.validator.message(
              "start_date",
              this.state.start_date,
              "required",
              {
                className: "text-danger",
                messages: {
                  required: "The start date field is required",
                },
              }
              )}

            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Add end date</Form.Label>

              <Form.Control
              type="datetime-local"
              name="end_date"
              placeholder="End Date"
              onChange={this.handleChange}
              disabled={!this.state.start_date}
              />

              {this.validator.message(
                "end_date",
                this.state.end_date,
                "required|dateAfter",
                {
                  className: "text-danger",
                  messages: {
                    required: "The end date field is required",
                  },
                }
                )}
            </Form.Group>
          </Row>

          <Row className="my-5">
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={2} alternativeLabel>
                {steps.map((label,index) => {
                  const labelProps = {};
                  if (index===0) {
                    labelProps.optional = (
                      <Typography color="success">
                        {start_date?start_date:""}
                      </Typography>
                    );
        
                  }
                  else if(index === steps.length-1){
                    labelProps.optional = (
                      <Typography color="error">
                        {end_date?end_date:""}
                      </Typography>
                    );
        
                    labelProps.error = true;
                  }
                  return(
                    <Step key={label}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </Box>
          </Row>
    </Form>
    )}
    
  </Modal.Body>

<Modal.Footer>
<Button
    id="modal-close-button"
    onClick={() => this.toggleAddProgress()}
  >
    Close
  </Button>

  <Button variant="primary" 
      onClick={this.handleAddProgress}>
        Save changes
      </Button>
</Modal.Footer>

</Modal>

<Modal
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
show={this.state.showProgressModal}
onHide={() => this.toggleProgressModal()}
>

<Modal.Header closeButton>
<Modal.Title>Syllabus Coverage or Timeline</Modal.Title>
{/* <Modal.Title>{progress?.form_display_title?progress.form_display_title:'Not available'}</Modal.Title> */}
</Modal.Header>

<Modal.Body>
{progress_loading?(
      <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <CircularProgress />
      </div>
    ):(
      <Form>
          <Row className="my-5">
            <Box sx={{ width: '100%'}}>
            
            {/* <Typography gutterBottom>Progress Bar</Typography> */}
            <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '3px',
                  mt: -1,
                }}
              >
                <TinyText sx={{ fontSize: '10px',fontWeight: 'bold'}}>Start Date : {dayArray[0]?.label}</TinyText>
                <TinyText sx={{ fontSize: '10px',fontWeight: 'bold'}}>End Date :{dayArray[dayArray.length-1]?.label}</TinyText>
              </Box>
              <IOSSlider
                aria-label="ios slider"
                value={todayIndex}
                marks={marks}
                min={dayArray[0]?.value}
                max={dayArray[dayArray.length-1]?.value}
                step={1}
                valueLabelDisplay="on"
                getAriaValueText={this.valueLabelFormat}
                valueLabelFormat={this.valueLabelFormat}
                onChange={(event,value)=>this.setState({todayIndex:value})}
                sx={{ color: '#5458AF'}}
              />
              
            </Box>
          </Row>

          <Row className="my-5">

          <List dense sx={{ 
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 }, 
            }}>

          {progress_details?.map((progressItem,index) => {
            return (
              <div key={index}>
                <ListItem 

                  alignItems="flex-start" 
                  key={index}
                  style={{marginBottom: '10px'}}
                  >
                    {!!progress.privilege_delete && 
                      <React.Fragment>
                      <ListItemSecondaryAction>
                          {/* <IconButton edge="end" aria-label="delete" onClick={() => this.deleteProgressItem(progressItem)}>
                              <DeleteIcon color="error" />
                          </IconButton> */}
                          <Button
                        className="btn btn-icon btn-danger btn-sm m-1 flaticon-delete"
                        title="Delete Details"
                      /> 
                      </ListItemSecondaryAction>
                      </React.Fragment>
                    }
                    
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: '#5458AF'}}>
                        {progressItem?.percentage + "%"}
                      </Avatar>
                    </ListItemAvatar>
                  <ListItemText
                    primary={progressItem.date}
                    secondary={
                      <React.Fragment>
                        {progressItem.comment?progressItem.comment:""}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            );
          })}
          </List>
          
          {!!progress && !!progress.privilege_add &&

            <Box sx={{width: '100%',maxWidth: 360, marginLeft:'10px'}}>
                                      
            <Form.Label>Add date</Form.Label>

              <Form.Control
              type="datetime-local"
              name="date"
              placeholder="Date"
              onChange={this.handleChange}
              />
              {this.validator.message(
              "date",
              this.state.date,
              "required|dateLastProgressAfter",
              {
                className: "text-danger",
                messages: {
                  required: "The date field is required",
                },
              }
              )}

              <Form.Label>Percentage covered</Form.Label>

              <Form.Control
              type="number"
              name="percentage"
              placeholder="Percentage covered"
              onChange={this.handleChange}
              />
              {this.validator.message(
              "percentage",
              this.state.percentage,
              "required|percentageAfter|numeric|between:1,100",
              {
                className: "text-danger",
                messages: {
                  required: "The percentage field is required",
                },
              }
              )}

              <Form.Label>Comment</Form.Label>

              <Form.Control
              type="text"
              name="comment"
              placeholder="Comment"
              onChange={this.handleChange}
              />
              {this.validator.message(
              "comment",
              this.state.comment,
              "required",
              {
                className: "text-danger",
                messages: {
                  required: "The comment field is required",
                },
              }
              )}

            </Box>
          }
          
          </Row>
    </Form>
    )}
</Modal.Body>

<Modal.Footer>
<Button
  id="modal-close-button"
  onClick={() => this.toggleProgressModal()}
>
  Close
</Button>
{!!progress && !!progress.privilege_add && 
<Button variant="primary" 
    onClick={()=>this.handleProgressSubmit()}>
      Save changes
    </Button>
}
</Modal.Footer>

</Modal>