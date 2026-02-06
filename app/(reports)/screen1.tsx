import React from 'react';
import { Text, View } from 'react-native';
import { BarChart } from "react-native-gifted-charts";

export default function Screen1() {

  const data = [

    // ===== 20-Nov 2025 =====
    { value: 5, label: '20-Nov\n2025', frontColor: '#2F5597' },
    { value: 6, frontColor: '#ED7D31' },
    { value: 2, frontColor: '#A5A5A5' },
    { value: 4, frontColor: '#FFC000' },
    { value: 3, frontColor: '#5B9BD5' },

    // espacio entre grupos
    { value: 0, spacing: 20 },

    // ===== 25-May 2025 =====
    { value: 3, label: '25-May\n2025', frontColor: '#2F5597' },
    { value: 6, frontColor: '#ED7D31' },
    { value: 1, frontColor: '#A5A5A5' },
    { value: 2, frontColor: '#FFC000' },
    { value: 1, frontColor: '#5B9BD5' },

    { value: 0, spacing: 20 },

    // ===== 10-Nov 2026 =====
    { value: 1, label: '10-Nov\n2026', frontColor: '#2F5597' },
    { value: 2, frontColor: '#ED7D31' },
    { value: 1, frontColor: '#A5A5A5' },
    { value: 1, frontColor: '#FFC000' },
    { value: 1, frontColor: '#5B9BD5' },

    { value: 0, spacing: 20 },

    // ===== 10-May 2026 =====
    { value: 0, label: '10-May\n2026', frontColor: '#2F5597' },
    { value: 1, frontColor: '#ED7D31' },
    { value: 0, frontColor: '#A5A5A5' },
    { value: 1, frontColor: '#FFC000' },
    { value: 0, frontColor: '#5B9BD5' },

  ];


  const barData = [

    { value: 55, label: '20-Nov', frontColor: '#f58220' },
    { value: 68, frontColor: '#9e9e9e' },

    { value: 50, label: '21-Nov', frontColor: '#f58220' },
    { value: 68, frontColor: '#9e9e9e' },

    { value: 51, label: '22-Nov', frontColor: '#f58220' },
    { value: 63, frontColor: '#9e9e9e' },

    { value: 34, label: '23-Nov', frontColor: '#f58220' },
    { value: 43, frontColor: '#9e9e9e' },

  ];

  return (
    <View style={{ padding: 20 }}>

      <Text style={{
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20
      }}>
        Feedback's Aplicados
      </Text>

      <BarChart
        data={data}
        barWidth={14}
        spacing={6}
        initialSpacing={20}
        yAxisThickness={0}
        xAxisThickness={1}
        hideRules={false}
        noOfSections={7}
      />
      <View style={{ marginVertical: 30  }}>
        <Text style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 20
        }}>
          Avance Diario Instalacion de Pernos - Shell
        </Text>

        <View style={{ flexDirection: 'row' }}>

          {/* ===== CHART ===== */}

          <BarChart
            data={barData}
            barWidth={28}
            spacing={10}
            initialSpacing={20}
            noOfSections={10}
            maxValue={100}
            hideRules={false}
            rulesColor="#001f5b"
            xAxisThickness={1}
            yAxisThickness={0}
            isAnimated
            showValuesAsTopLabel
          />

          {/* ===== GAUGE SIMPLE ===== */}

          <View style={{
            marginLeft: 20,
            alignItems: 'center'
          }}>

            <View style={{
              width: 120,
              height: 60,
              borderTopLeftRadius: 120,
              borderTopRightRadius: 120,
              backgroundColor: '#eee',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                56%
              </Text>
            </View>

          </View>

        </View>

        {/* ===== LEYENDA ===== */}

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20
        }}>

          <Text style={{ color: '#f58220', marginRight: 20 }}>
            ■ turno A
          </Text>

          <Text style={{ color: '#9e9e9e' }}>
            ■ turno B
          </Text>

        </View>
      </View>

    </View>
  );
}