import { useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from '@/hooks/updateAction'
import { Text as BodyText } from '@/components/serializers/text'
import { Heading, Box, Select, FormControl, FormLabel } from '@chakra-ui/react'

export function Options({ question, title, description }) {
  // console.log({ question, title, description })
  const { register, handleSubmit } = useForm()
  const { actions, state } = useStateMachine({ updateAction })
  const { currentQuestion } = state.calculator
  const optionSetsLength = question?.optionSets?.length
  const mainRef = useRef()

  // useEffect(() => {
  //   setTimeout(() => {
  //     mainRef.current.focus()
  //   }, 1)
  // }, [])

  // Using the question's logic to show or hide
  const questionLogic = q => {
    let showQuestion = false
    if (q?.optionLogics === undefined || q?.optionLogics?.length === 0) {
      showQuestion = true
    } else {
      showQuestion =
        q?.optionLogics &&
        q?.optionLogics?.map(
          logic =>
            state?.calculator?.questions[logic.logicSourceQuestion._ref]?.answer ===
            logic.logicSourceValue
        )
    }
    let result = Array.isArray(showQuestion)
      ? !showQuestion.some(element => element === false)
      : showQuestion
    return result
  }
  // Update State when a Select value has been updated
  const selectUpdate = (val, question) => {
    actions.updateAction({
      ...state,
      calculator: {
        ...state.calculator,
        questions: {
          ...state.calculator.questions,
          [question._id]: {
            title: question.title,
            answer: val ? val : null
          }
        }
      }
    })
  }
  // console.log(questionLogic(question.optionSets))
  // console.log(questionLogic(question.optionSets))
  // console.log(question.optionSets[0])
  // console.log(question?.optionSets[1])
  // console.log(questionLogic(question?.optionSets[1]))


  const OptionShowLogic = () => {
    let showQuestion = false
    // Find the length of the Option Sets
    // if 0 or undefined then return null
    if(question?.optionSets?.length < 1){
      showQuestion = false
    } else if (question?.optionSets?.length === 1){
      // if 1 return it
      showQuestion = true
    } else {

      // if multiple then loop through each until you find the *first* one that ==== true
      // showQuestion =
      // question?.optionLogics &&
      // question?.optionLogics?.map( logic =>
      //   console.log(state?.calculator?.questions[logic.logicSourceQuestion._ref]?.answer === logic.logicSourceValue)
      //   )
    }
    let result = Array.isArray(showQuestion)
    ? !showQuestion.some(element => element === false)
    : showQuestion
  // return result
  // console.log({result})
  }
  // question?.optionSets.map(option => console.log(option))
  OptionShowLogic()

  // console.log(question?.optionLogics)
  // question?.optionLogics?.map(option => <OptionContainer option={option} key={option._id} />)



  return (
    <>

      {optionSetsLength === 1 ? (
        <FormControl id={question?.optionSets[0]._key} key={question?.optionSets[0]._key} mb="6">
          <FormLabel>
            <Heading mb="6" as="h1" ref={mainRef} tabIndex="-1">
              {title}
            </Heading>
          </FormLabel>
          {description && (
            <Box
              mb="8"
            >
              <BodyText blocks={description} />
            </Box>
          )}
          <Select
            {...register(`${question._id}`)}
            value={`${state?.calculator?.questions[question?._id]?.answer}`}
            placeholder="Make a selection"
            onChange={e => selectUpdate(e.currentTarget.value, question)}
            borderColor="#A2A4A3"
            borderRadius="none"
          >
            {question?.optionSets[0].options.map(option => (
              <option value={option.value.current} key={option._key}>
                {option.title}
              </option>
            ))}
          </Select>
        </FormControl>
      ) : (
        question?.optionSets.map(
          optionSet =>
            questionLogic(optionSet) && (<>test
              <FormControl id={optionSet._key} key={optionSet._key} mb="6">
                <FormLabel>
                  <Heading mb="6">{title}</Heading>
                </FormLabel>
                <Box mb="4">
                  <BodyText blocks={description} />
                </Box>
                <Select
                  {...register(`${question._id}`)}
                  value={`${state?.calculator?.questions[question?._id]?.answer}`}
                  placeholder="Make a selection"
                  onChange={e => selectUpdate(e.currentTarget.value, question)}
                >
                  {optionSet.options.map(option => (
                    <option value={option.value.current} key={option._key}>
                      {option.title}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </>)
        )
      )}
    </>
  )
}
