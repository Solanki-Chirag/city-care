from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
import random

# Sample complaint data
road_complaints = [
    # Original examples (for reference)
    "There are multiple potholes on the road near my house, making it unsafe for vehicles.",
    "The road near the park is damaged and needs immediate repair.",
    
    # Augmented data to handle conflicts
    "The road is blocked by a fallen tree, making it impossible to commute.",
    "A pothole on the road near the streetlight is causing accidents for vehicles.",
    "The road surface is cracked near the bus stop, causing inconvenience to passengers.",
    "Potholes near the market road are slowing down traffic significantly.",
    "There are broken tiles on the sidewalk near the school, making it unsafe for pedestrians.",
    "The road near the railway station is uneven, causing vehicles to swerve dangerously.",
    "A damaged road near the construction site is making it difficult for trucks to pass.",
    "There is a large pothole near the town square that's filling with water during rains.",
    "The road divider near the supermarket is broken, creating a traffic hazard.",
    "A patch of the road near the community center is worn out and needs resurfacing.",
    "The highway near the toll booth has severe cracks, making it dangerous for commuters.",
    "The bridge connecting the town is developing cracks and needs urgent attention.",
    "The intersection near the fire station has uneven roads causing vehicle damage.",
    "The service road near the shopping complex is filled with debris from recent construction.",
    "The road near the petrol station has become slippery due to an oil spill.",
    "There are loose gravel and rocks scattered across the road near the housing complex.",
    "The road leading to the local temple is uneven and causing discomfort to visitors.",
    "The road near the playground is muddy and slippery, making it unsafe for children.",
    "The newly laid road near the town hall has started to develop cracks.",
    "The road near the hospital is congested due to poor maintenance and potholes.",
    "A part of the highway is blocked due to an unfinished repair project.",
    "The bicycle lane on the road is obstructed by debris from a recent accident.",
    "The road near the restaurant is full of cracks and causing vehicle damage.",
    "A manhole cover on the road near the bus terminal is missing, posing a risk.",
    "The road near the zoo entrance is flooded due to poor drainage during rains.",
    "The street near the library is riddled with potholes, slowing down traffic.",
    "The access road to the train station is damaged, making it hard for taxis to navigate.",
    "The road near the university gate has developed several dangerous potholes.",
    "The highway ramp near the stadium has loose asphalt, posing a risk to vehicles.",
    "The road near the concert hall has debris scattered from a recent festival.",
    "The street near the housing colony has been dug up for repairs and left unfinished.",
    "The service road near the industrial area is filled with potholes and uneven patches.",
    "The road connecting the airport to the main city is deteriorating and needs urgent repairs.",
    "The road divider near the cinema is broken and causing confusion for drivers.",
    "The road near the community park has uneven patches, making it hard for cyclists.",
    "The stretch of road leading to the town square is in poor condition and needs repair.",
    "The road near the train tracks is poorly maintained and frequently causes accidents.",
    "The highway near the toll plaza has deep cracks, making it risky for high-speed vehicles.",
    "The access road to the beach is blocked by sand and debris from the wind.",
    "The bridge over the canal has broken guardrails and uneven surface, making it dangerous.",
    "The road leading to the shopping mall has loose gravel, causing tires to skid.",
    "The lane near the fire station has been left unfinished and is causing traffic congestion.",
    "The road connecting the village to the main city has been washed away in the rains.",
    "The ramp near the underpass is uneven and has caused several vehicle accidents.",
    "The road near the bus stop is covered with mud and debris from nearby construction.",
    "The street near the grocery store is littered with broken tiles from the sidewalk.",
    "The main road leading to the housing complex has several potholes filled with water.",
    "The road near the post office has loose gravel making it unsafe for bikers.",
    "The stretch near the university library is poorly lit and full of cracks.",
    "There are several potholes on the main road causing traffic disruptions.",
    "The road near the market is uneven and needs resurfacing.",
    "The highway has cracks that make it unsafe for vehicles.",
    "Road construction debris has been left on the street, blocking traffic.",
    "The street near the school has a large pothole that needs immediate repair.",
    "A portion of the road has collapsed near the bridge after the rains.",
    "The road near the stadium is flooded due to poor drainage.",
    "The speed breakers on this road are too high, causing vehicle damage.",
    "There is water stagnation on the road due to uneven surfaces.",
    "The newly constructed road near the park has already started cracking.",
    "The road near the hospital is in poor condition and needs urgent repair.",
    "The street near the residential area is filled with construction material.",
    "Potholes on the road near the bus stand are causing accidents.",
    "The road connecting the highway to the town is completely eroded.",
    "There are large cracks on the road near the railway crossing.",
    "The street near the fire station is covered in mud, making it slippery.",
    "Road repairs are incomplete near the shopping complex.",
    "The road near the industrial area is full of gravel and dust.",
    "The street near the post office is broken and causing traffic jams.",
    "The road leading to the zoo is in a very bad state and needs reconstruction.",
    "A pothole near the community center is causing traffic congestion.",
    "The road near the university is uneven, making it unsafe for cyclists.",
    "The main road has been damaged by heavy trucks passing through.",
    "The road near the market is flooded, making it unusable for vehicles.",
    "The street near the library is covered with loose asphalt.",
    "The road near the park has several cracks and is difficult to navigate.",
    "The road near the mall is under construction and causing inconvenience.",
    "The side road near the town square is blocked with rubble.",
    "A bump on the road near the petrol station needs leveling.",
    "The street light has tilted due to the road caving in",  
    "Large potholes near the street light pole are causing accidents",  
    "A broken road section near the streetlights makes the area unsafe",  
    "The uneven road under the streetlights is causing waterlogging and accidents",  
    "The road near the lamp post has collapsed, making it difficult for vehicles to pass",  
    "Cracks in the road near streetlight poles are spreading due to heavy rains",  
    "The road under the streetlights has deep pits, creating a safety hazard for vehicles",  
    "The streetlight pole is shaking because the road foundation is eroded",  
    "A section of the road near the streetlights has become completely inaccessible due to damage",  
    "The road under the streetlights has developed huge cracks, making it risky for pedestrians",
    "Potholes are filled with dirty sewage water, causing accidents.",
    "The road near the sewage drain has caved in." ,
    "A broken road section is blocking access to the sewage line for repairs.",
    "Heavy vehicles damaged the road near the sewage pipeline repair site.",
    "Road collapse occurred near the manhole cover.",
    "The road adjacent to the sewage line construction site is full of deep potholes.",
    "Potholes have formed around the manhole, creating a hazard for motorists",  
    "A section of the road has collapsed near the sewer line maintenance area",  
    "Broken road sections are causing delays in fixing the nearby sewage drain",  
    "Heavy machinery working on the sewer line has cracked the road surface",  
    "The road foundation is weakened due to water seepage from the sewage system",  
    "A deep pothole has developed near the manhole cover, causing accidents",  
    "Road damage is spreading around the sewage pipeline excavation site",  
    "The road surface is uneven because of subsidence near the sewage line",  
    "Construction work on the sewage drain has left the adjacent road full of potholes",
    "Road cracks are widening because garbage collection vehicles repeatedly pass over it.",
    "The road near the waste dumping site has developed deep ruts from heavy trucks.",
    "Uneven roads near the waste collection zone are causing accidents.",
    "A section of the road near the waste site has collapsed due to repeated truck traffic.",
    "The heavy garbage trucks are damaging the road surface, causing cracks and holes" ,
]

sewage_complaints = [
    # Original examples (for reference)
    "The sewer line near my house is clogged, causing water to overflow.",
    "There is a foul smell coming from the open sewer near the market.",
    
    # Augmented data to handle conflicts
    "The sewer on the road is overflowing, mixing with waste and creating a mess.",
    "Sewage water is leaking onto the road, making it difficult for vehicles to pass.",
    "There is an open drain near the sidewalk that is blocked and needs cleaning.",
    "The drainage system near the streetlight is clogged, causing waterlogging in the area.",
    "Sewage water is overflowing from the manhole on the road, causing a health hazard.",
    "The open sewer near the bus stop is emitting a foul smell, making the area unpleasant.",
    "Sewage is leaking near the main road intersection, creating a sanitation issue.",
    "The sewer line near the park is blocked, and water is overflowing onto the pavement.",
    "A clogged drain near the playground is spilling sewage water onto the street.",
    "Sewage water is mixing with rainwater on the road near the school, creating a hazard.",

    # Additional variety
    "There is an open sewer near the hospital that is clogged and emitting a bad odor.",
    "The drainage near the railway crossing is blocked, causing sewage to overflow.",
    "Sewage water is spilling onto the road near the shopping mall entrance.",
    "A blocked drain near the cinema is causing waterlogging and a foul smell.",
    "The sewer near the stadium parking lot is leaking, creating a mess on the road.",
    "Sewage water is overflowing from the drain near the community center.",
    "The drainage system near the police station is clogged, making the area unsanitary.",
    "A broken sewer pipe near the library is leaking water onto the street.",
    "The drainage near the bus terminal is overflowing and causing a health concern.",
    "Sewage water near the fire station is creating a foul smell in the area.",
    
    # Focus on overlapping phrases
    "The drain near the road intersection is clogged, mixing with waste and rainwater.",
    "Sewage from the open manhole near the park is causing a sanitation issue.",
    "A blocked sewer near the grocery store is spilling water onto the road.",
    "The sewer system near the street corner is clogged, causing waterlogging in the area.",
    "Sewage is overflowing near a pothole, making the road slippery and unsafe.",
    "The open drain near the streetlight is blocked, causing foul water to spill onto the road.",
    "Sewage water near the traffic signal is pooling on the road, creating a mess.",
    "A clogged sewer near the bridge is causing water to overflow onto the pedestrian walkway.",
    "The drainage near the university campus is blocked, creating unsanitary conditions.",
    "Sewage water near the drainage system is mixing with garbage, creating a health hazard.",
    
    # More location-specific examples
    "The open drain near the temple is clogged, creating a foul smell in the area.",
    "Sewage water is overflowing near the petrol station and spreading onto the road.",
    "A blocked sewer near the water fountain in the park is causing waterlogging.",
    "The drainage near the housing complex is clogged, making the area unhygienic.",
    "Sewage is leaking near the road divider and spreading onto both sides of the street.",
    "A broken sewer pipe near the service road is creating a mess for commuters.",
    "The drainage near the bicycle lane is blocked, making it difficult to use.",
    "Sewage water near the metro station is pooling on the road, creating a foul smell.",
    "The open drain near the school entrance is clogged, causing inconvenience to students.",
    "Sewage water is leaking near the construction site and spreading onto the road.",

    "The road is flooded with sewage water from a leaking sewer line.",
    "Dirty water from the drainage system is flowing onto the street and causing inconvenience.",
    "Sewage lines are broken, and the road is filled with wastewater.",
    "A clogged sewer has led to dirty water flooding the main road near the park.",
    "The road near the school is submerged in sewage due to a leakage in the pipes.",
]


street_light_complaints = [
    # Original examples (for reference)
    "The streetlight near my house is not functioning properly, leaving the area dark.",
    "There is a flickering streetlight near the park entrance, creating an inconvenience.",
    
    # Augmented data to handle conflicts
    "A broken streetlight near the road is making the area unsafe for pedestrians.",
    "The streetlight near the school crossing is not working, creating a risk for students.",
    "Several streetlights near the stadium are out, leaving the road in complete darkness.",
    "The streetlight near the temple is flickering, causing inconvenience to visitors.",
    "The streetlight near the mall entrance is broken, making the area vulnerable to theft.",
    "A fallen streetlight near the park has blocked part of the road, causing traffic delays.",
    "The streetlight post near the library has been damaged in an accident.",
    "The area near the grocery store is dark due to multiple non-functional streetlights.",
    "The streetlight near the bus stop is not working, making it unsafe for commuters.",
    "A broken streetlight near the town square is causing reduced visibility at night.",
    "The streetlights near the hospital entrance are out, creating a safety issue.",
    "The streetlight near the post office is flickering, causing discomfort to passersby.",
    "Multiple streetlights near the zoo are malfunctioning, making the area unsafe.",
    "The streetlight near the construction site is out, causing difficulty for night workers.",
    "The area near the university gate is poorly lit due to non-functional streetlights.",
    "A damaged streetlight post near the petrol station is leaning dangerously.",
    "A streetlight has fallen on the road, blocking traffic.",
    "The streetlight pole near my house fell onto the road after the storm.",
    "A lamp post collapsed on the main street, causing obstruction.",
    "The streetlight near the park has fallen and needs urgent removal.",
    "A streetlight pole has fallen near the school entrance and is blocking the path.",
    "The fallen streetlight near the bus stop is creating a hazard.",
    "A streetlight has toppled over near the grocery store, causing inconvenience.",
    "A lamp post fell on the road near the hospital, making the area unsafe.",
    "A streetlight near the stadium has fallen onto the road after heavy winds.",
    "The streetlight pole near the community center has collapsed onto the road.",
    "The streetlight near my house has not been working for weeks.",
    "The lamp post near the park is flickering and needs repair.",
    "There are no working streetlights on the road near the bus stop.",
    "The street near the shopping mall is completely dark due to broken lights.",
    "The streetlight near the hospital entrance is damaged and needs replacement.",
    "A streetlight post near the stadium has fallen after the storm.",
    "There is no lighting on the road near the railway crossing, making it unsafe.",
    "The area near the school is very dark as the streetlights are not functioning.",
    "The streetlight near the grocery store is broken and hanging dangerously.",
    "There are flickering lights on the main road near the fire station.",
    "The street near the police station is not lit properly, causing visibility issues.",
    "The streetlight near the temple is damaged and not working at all.",
    "There are no functioning streetlights near the playground in the residential area.",
    "The lights near the concert hall are too dim, making the area unsafe at night.",
    "The streetlights on the highway have been off for several days.",
    "The road near the town square is completely dark due to missing lights.",
    "A lamp post near the zoo entrance is leaning and looks like it might fall.",
    "The street near the university campus has no functional lighting.",
    "The streetlights on the service road are not working after the rain.",
    "The street near the cinema hall is dark because the lights have been stolen.",
    "The lamp post near the public park is making sparking noises.",
    "The area near the shopping mall has lights that turn off intermittently.",
    "There are no working streetlights near the stadium parking lot.",
    "The streetlights near the restaurant are dim and need brighter bulbs.",
    "The lamp posts near the bus terminal are rusted and not functioning.",
    "The lights near the town hall are malfunctioning and need immediate attention.",
    "The streetlights on the pedestrian crossing near the library are not working.",
    "The street near the industrial area is dark because the lights are broken.",
    "The streetlights near the petrol station are not functioning at all.",
    "The street light is flickering, making the road unsafe at night",  
    "Street lights near the potholes are not functioning, causing accidents",  
    "The misalignment of street lights is making it hard to see the road properly",  
    "The street light pole is obstructing the road due to its position",  
    "The street light is casting too much glare onto the road, blinding drivers",  
    "A broken street light is making the road hazardous at night",  
    "The street light is hanging low and blocking traffic on the road",  
    "The malfunctioning street light creates dark spots on the road, increasing accident risk",  
    "Street lights are positioned in a way that obstructs drivers' view of the road signs",  
    "The street light near the cracked road is not providing enough illumination, making it difficult for drivers to navigate",
    "The streetlight is not working, leaving the road in complete darkness",  
    "The streetlight pole is leaning over the road, causing a safety hazard",  
    "Streetlights near the curve are dim, making it hard to see the road clearly",  
    "Broken streetlights are making it difficult for drivers to navigate at night",  
    "Streetlights are not illuminating the pedestrian crossing, creating safety concerns",  
    "The streetlight's bright glare is blinding drivers at night",  
    "The streetlight is out of alignment, casting shadows over the road",  
    "The streetlight flickers intermittently, creating dangerous driving conditions",  
    "Streetlight poles are positioned in a way that blocks the road signs",  
    "The streetlight is obstructing the view of traffic signals, causing confusion for drivers",  
    "Streetlights are not working near the sewage treatment plant area",  
    "The streetlight is short-circuiting due to sewage water leakage",
    "Street light fell on the road"
]



waste_management_complaints = [
    # Original examples (for reference)
    "There is uncollected waste on the road near my house, attracting pests.",
    "The waste on the street near the park has been piling up for days.",
    
    # Augmented data to handle conflicts
    "Garbage is lying on the road, causing a sanitation issue.",
    "There is trash scattered across the road, making it unsightly and attracting flies.",
    "Waste has been dumped on the sidewalk near the main road, creating a health hazard.",
    "Garbage bags are overflowing on the road, blocking pedestrian movement.",
    "Uncollected trash near the road intersection is attracting stray animals.",
    "The area near the streetlight is littered with garbage, creating an eyesore.",
    "Garbage is dumped near a pothole, causing a double nuisance for commuters.",
    "Uncollected waste near a broken road is making the situation worse for vehicles.",
    "There is trash near the street lamp, which is also flickering and needs repair.",
    "Piles of garbage have been left near the bus stop, alongside damaged pavement.",
    
    # Additional variety
    "The road near the park is filled with uncollected waste, creating a stench.",
    "A heap of garbage is lying near the construction site and blocking traffic.",
    "Uncollected trash near the railway crossing is making the area unsafe for pedestrians.",
    "Garbage bags left near the town square are spilling onto the road.",
    "The waste near the school has been scattered due to wind, affecting nearby streets.",
    "Uncollected trash near the mall entrance is obstructing vehicle movement.",
    "There is a pile of garbage on the road near the playground.",
    "Waste from the nearby market is littered across the main road.",
    "Overflowing garbage bins near the metro station are spilling onto the street.",
    "Trash is scattered near a manhole on the road, creating a sanitation issue.",
    
    # Focus on overlapping phrases
    "Garbage left on the road near the sewer opening is causing a blockage.",
    "Trash piled near a streetlight post is attracting stray dogs and flies.",
    "Waste dumped near a pothole on the road is worsening traffic conditions.",
    "The road is covered with garbage and broken streetlights, making it unsafe.",
    "Garbage is spread across the road, mixing with water from a broken pipe.",
    "Trash near the street corner is spilling into the drainage system.",
    "Waste on the road is blocking access to the sidewalk and streetlight.",
    "Garbage bags left near the traffic signal are creating a mess on the road.",
    "There is trash on the road under the bridge, making it difficult for pedestrians.",
    "Uncollected waste near the roadside is causing drainage issues in the area.",
    
    # More location-specific examples
    "Trash is scattered near the curbside along the highway.",
    "The street near the restaurant is filled with waste, making it unpleasant for visitors.",
    "A pile of garbage is lying near the local temple, attracting flies.",
    "Uncollected waste near the petrol station is causing a foul smell.",
    "Trash near the water fountain in the public square needs to be removed urgently.",
    "The garbage pile near the road crossing is obstructing visibility for drivers.",
    "Waste near the housing complex road is being ignored, causing a stink.",
    "There is trash near the road divider, which is spilling into both lanes.",
    "Garbage on the service road is making it unsafe for two-wheelers.",
    "Trash dumped near the bicycle lane is making it impossible to use.",

    "Trash is scattered near my home, causing a health hazard.",
    "Garbage outside my house is piling up.",
    "Waste collection has been delayed near the stadium.",
    "Uncollected trash is creating issues in the community park.",
    "There is trash near the shopping mall that hasn’t been cleared.",
    "Garbage is overflowing near the supermarket.",
    "Waste disposal near the library is inadequate, and trash is everywhere.",
    "Trash bins near the bus stop are not being emptied regularly.",
    "Garbage is scattered on the roads near the concert hall.",
    "Waste is piling up near the post office, and it’s causing a bad smell.",
    "Trash bags left outside the school are attracting stray dogs.",
    "Uncollected garbage near the fire station is becoming a sanitation issue.",
    "There is trash in the area near the grocery store that hasn’t been picked up.",
    "Garbage near the community center has been left uncollected for days.",
    "The waste near the hospital entrance is making the area unsanitary.",
    "Trash has been left near the zoo entrance, making the place unpleasant.",
    "Garbage cans near the library are overflowing and need urgent attention.",
    "Waste on the street near the train station is causing inconvenience.",
    "Trash bins near the university campus are full and need emptying."
]


# Prepare training data
complaints = []
labels = []

for _ in range(1000):
    complaints.append(random.choice(road_complaints))
    labels.append("Road Department")
    complaints.append(random.choice(waste_management_complaints))
    labels.append("Waste Management Department")
    complaints.append(random.choice(sewage_complaints))
    labels.append("Sewage Department")
    complaints.append(random.choice(street_light_complaints))
    labels.append("Street Light Department")

# Vectorization and model training
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(complaints)  # Convert text data into TF-IDF features
y = labels

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

nb_model = MultinomialNB()
nb_model.fit(X_train, y_train)

# Prediction function
def predict_department(input_description):
    input_tfidf = vectorizer.transform([input_description])
    predicted_department = nb_model.predict(input_tfidf)
    return predicted_department[0]

# Terminal-based testing
if __name__ == "__main__":
    while True:
        user_input = input("Enter a complaint description (or type 'exit' to quit): ")
        if user_input.lower() == "exit":
            print("Exiting...")
            break
        predicted_department = predict_department(user_input)
        print(f"Predicted Department: {predicted_department}")
